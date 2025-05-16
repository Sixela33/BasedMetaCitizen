'use client'
import { proxyAxois } from '@/app/api/axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import React from 'react'
import Loading from '@/components/Loading';
import DeployTokenPopup from './components/DeployTokenPopup';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import {
    Carousel,   
    CarouselContent,    
    CarouselItem,   
    CarouselNext,   
    CarouselPrevious,   
} from "@/components/ui/carousel";
import axios from 'axios';

interface Token {
    address: string;
    fileUris: string;
    id: number;
    jsonUri: string;
    name: string;
    symbol: string;
}

interface Factory {
    address: string;
    createdAt: string;
    id: string;
    name: string;
    tokens: Token[];
}

export default function TokenList() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const [factory, setFactory] = useState<Factory>();
    const [loading, setLoading] = useState(false);
    const [tokenImages, setTokenImages] = useState<Record<number, string[]>>({});
    const [loadingImages, setLoadingImages] = useState<Record<number, boolean>>({});

    const fetchTokens = useCallback(async () => {
        setLoading(true);
        try {
            const response = await proxyAxois.get(`/organizations/factory/${id}`);
            setFactory(response.data);
            
            // Initialize loading state for each token's images
            if (response.data?.tokens) {
                const initialLoadingState = response.data.tokens.reduce((acc: Record<number, boolean>, token: Token) => {
                    acc[token.id] = true;
                    return acc;
                }, {} as Record<number, boolean>);
                setLoadingImages(initialLoadingState);
            }
        } catch (error) {
            console.error('Error fetching tokens:', error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    // Separate function to load images for a specific token
    const loadImagesForToken = async (token: Token) => {
        if (!token.fileUris) {
            setLoadingImages(prev => ({ ...prev, [token.id]: false }));
            return;
        }

        try {
            // Parse fileUris - it might be a JSON string or a comma-separated list
            let uris: string[] = [];
            try {
                uris = JSON.parse(token.fileUris);
            } catch {
                uris = token.fileUris.split(',').map(uri => uri.trim()).filter(Boolean);
            }
            
            if (uris.length === 0) {
                setLoadingImages(prev => ({ ...prev, [token.id]: false }));
                return;
            }
            
            // Get gateway URLs for each CID
            const imageUrls = await Promise.all(
                uris.map(async (cid) => {
                    const response = await axios.get(`/api/pinata/read?cid=${cid}`);
                    return response.data.cid;
                })
            );
            
            setTokenImages(prev => ({ ...prev, [token.id]: imageUrls }));
        } catch (error) {
            console.error(`Error fetching images for token ${token.id}:`, error);
        } finally {
            setLoadingImages(prev => ({ ...prev, [token.id]: false }));
        }
    }

    useEffect(() => {
        if (id) {
            fetchTokens();
        }
    }, [id, fetchTokens]);

    // Load images after tokens are fetched
    useEffect(() => {
        if (factory?.tokens) {
            factory.tokens.forEach(token => {
                loadImagesForToken(token);
            });
        }
    }, [factory]);

    if (loading || !factory) return <Loading />;
  
    return (
        <div className='p-8 flex flex-col flex-grow w-full'>
            <div className='flex justify-between items-center mb-6'>
                <Button variant="outline" onClick={() => router.back()}>Back</Button>
                <h1 className='text-2xl font-bold'>Tokens</h1>
                <DeployTokenPopup id={id} />
            </div>
            
            <Card className="max-w-5xl mx-auto w-full mb-6">
                <CardHeader>
                    <CardTitle>Factory Details</CardTitle>
                    <CardDescription>Information about the token factory</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">Contract Name</p>
                            <p className="font-medium">{factory?.name || 'N/A'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Contract Address</p>
                            <p className="font-medium truncate">{factory?.address || 'N/A'}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto'>
                {factory?.tokens.map((token) => (
                    <Card key={token.id} className='max-w-sm hover:shadow-md transition-shadow cursor-pointer' 
                          onClick={() => router.push(`/token/view/${token.id}`)}>
                        <CardHeader className="p-2 sm:p-4">
                            <div className="relative" onClick={(e) => e.stopPropagation()}>
                                {loadingImages[token.id] ? (
                                    <div className="h-36 sm:h-48 flex items-center justify-center rounded-lg bg-muted">
                                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground"/>
                                    </div>
                                ) : tokenImages[token.id]?.length > 0 ? (
                                    <Carousel>
                                        <CarouselContent>
                                            {tokenImages[token.id].map((img, index) => { 
                                                console.log(img)
                                                return (
                                                    <CarouselItem key={index}>
                                                        <img 
                                                        src={'https://ipfs.io/ipfs/' + img} 
                                                        alt={`${token.name} image ${index+1}`}
                                                        className="w-full h-36 sm:h-48 object-cover rounded-lg"
                                                    />
                                                </CarouselItem>
                                            )
                                        })}
                                        </CarouselContent>
                                        <CarouselPrevious className="hidden sm:flex" variant="link" />
                                        <CarouselNext className="hidden sm:flex" variant="link"/>
                                    </Carousel>
                                ) : (
                                    <div className="h-36 sm:h-48 flex items-center justify-center rounded-lg bg-muted">
                                        <p className="text-sm text-muted-foreground">No images available</p>
                                    </div>
                                )}
                                <Badge className="absolute top-2 right-2">{token.symbol}</Badge>
                            </div>
                            <div className="flex justify-between items-start mt-3">
                                <CardTitle>{token.name}</CardTitle>
                            </div>
                            <CardDescription>Token ID: {token.id}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500">Token Address</p>
                                <p className="font-medium truncate">{token.address}</p>
                            </div>
                            <div className="flex justify-end">
                                <Link href={`/token/view/${token.id}`}>
                                    <Button>View Details</Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                
                {factory?.tokens.length === 0 && (
                    <div className="col-span-full text-center py-12">
                        <p className="text-gray-500">No tokens found for this factory</p>
                        <DeployTokenPopup id={id} />
                    </div>
                )}
            </div>
        </div>
    )
}
