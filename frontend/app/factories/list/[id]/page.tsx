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
import { Loader2, ArrowLeft, Building, Eye, Calendar, Hash, Coins } from 'lucide-react';
import {
    Carousel,   
    CarouselContent,    
    CarouselItem,   
    CarouselNext,   
    CarouselPrevious,   
} from "@/components/ui/carousel";
import axios from 'axios';
import ProtectedRoute from '@/components/ProtectedRoute';
import Image from 'next/image';

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
        <ProtectedRoute>
            <div className="min-h-screen bg-black text-cyan-400 relative overflow-hidden">
                {/* Matrix Rain Background */}
                <div className="fixed inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />
                    <div className="absolute inset-0 opacity-10">
                        <div className="matrix-rain" />
                    </div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_70%)]" />
                </div>

                <div className="relative z-10 container mx-auto py-12 px-4">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <Button 
                            variant="outline" 
                            onClick={() => router.back()}
                            className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 hover:text-cyan-100 font-mono"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            BACK
                        </Button>
                        <div className="text-center">
                            <div className="inline-flex items-center rounded-full border border-cyan-500/50 bg-cyan-500/10 px-4 py-2 text-sm font-mono font-semibold text-cyan-300 backdrop-blur-sm">
                                <span className="mr-2 h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                                TOKEN MANAGEMENT
                            </div>
                        </div>
                        <DeployTokenPopup id={id} />
                    </div>

                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold font-mono mb-4">
                            <span className="text-cyan-300">FACTORY</span>{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                                TOKENS
                            </span>
                        </h1>
                        <div className="h-1 w-32 bg-gradient-to-r from-cyan-500 to-transparent mx-auto mb-6" />
                        <p className="text-cyan-200/80 font-mono text-lg max-w-2xl mx-auto">
                            {">"} Manage and deploy tokens from this factory
                            <br />
                            {">"} Monitor token configurations and metadata
                        </p>
                    </div>
                    
                    {/* Factory Details Card */}
                    <Card className="group relative cyber-border hover:cyber-glow transition-all duration-500 mb-8 max-w-4xl mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <CardHeader className="relative z-10">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="h-12 w-12 rounded-lg bg-cyan-500/20 border border-cyan-400 flex items-center justify-center">
                                    <Building className="h-6 w-6 text-cyan-400" />
                                </div>
                                <CardTitle className="text-xl font-bold font-mono text-cyan-300">
                                    FACTORY DETAILS
                                </CardTitle>
                            </div>
                            <CardDescription className="text-cyan-400/70 font-mono">
                                Information about the token factory deployment
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <p className="text-xs text-cyan-400/60 font-mono uppercase tracking-wider">Contract Name</p>
                                    <p className="text-cyan-300 font-mono bg-black/30 px-3 py-2 rounded border border-cyan-500/20">
                                        {factory?.name || 'N/A'}
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs text-cyan-400/60 font-mono uppercase tracking-wider">Contract Address</p>
                                    <p className="text-cyan-300 font-mono bg-black/30 px-3 py-2 rounded border border-cyan-500/20 truncate">
                                        {factory?.address || 'N/A'}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-cyan-400/70" />
                                <div>
                                    <p className="text-xs text-cyan-400/60 font-mono uppercase tracking-wider">Deployed</p>
                                    <p className="text-sm text-cyan-300 font-mono">
                                        {factory?.createdAt ? new Date(factory.createdAt).toLocaleDateString() : 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tokens Grid */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-12 w-12 rounded-lg bg-cyan-500/20 border border-cyan-400 flex items-center justify-center">
                                <Coins className="h-6 w-6 text-cyan-400" />
                            </div>
                            <h2 className="text-2xl font-bold font-mono text-cyan-300">DEPLOYED TOKENS</h2>
                        </div>

                        {factory?.tokens.length > 0 ? (
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto'>
                                {factory.tokens.map((token) => (
                                    <Card 
                                        key={token.id} 
                                        className='group relative cyber-border hover:cyber-glow transition-all duration-500 cursor-pointer' 
                                        onClick={() => router.push(`/token/view/${token.id}`)}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <CardHeader className="p-4 relative z-10">
                                            <div className="relative" onClick={(e) => e.stopPropagation()}>
                                                {loadingImages[token.id] ? (
                                                    <div className="h-48 flex items-center justify-center rounded-lg bg-black/30 border border-cyan-500/20">
                                                        <Loader2 className="h-8 w-8 animate-spin text-cyan-400"/>
                                                    </div>
                                                ) : tokenImages[token.id]?.length > 0 ? (
                                                    <Carousel>
                                                        <CarouselContent>
                                                            {tokenImages[token.id].map((img, index) => (
                                                                <CarouselItem key={index}>
                                                                    <Image 
                                                                        src={'https://ipfs.io/ipfs/' + img} 
                                                                        alt={`${token.name} image ${index+1}`}
                                                                        className="w-full h-48 object-cover rounded-lg border border-cyan-500/30"
                                                                    />
                                                                </CarouselItem>
                                                            ))}
                                                        </CarouselContent>
                                                        <CarouselPrevious className="hidden sm:flex border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10" />
                                                        <CarouselNext className="hidden sm:flex border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10" />
                                                    </Carousel>
                                                ) : (
                                                    <div className="h-48 flex items-center justify-center rounded-lg bg-black/30 border border-cyan-500/20">
                                                        <p className="text-sm text-cyan-400/70 font-mono">No images available</p>
                                                    </div>
                                                )}
                                                <Badge className="absolute top-2 right-2 bg-cyan-500/20 border-cyan-400 text-cyan-300 font-mono">
                                                    {token.symbol}
                                                </Badge>
                                            </div>
                                            <div className="flex justify-between items-start mt-3">
                                                <CardTitle className="text-lg font-bold font-mono text-cyan-300 group-hover:glow transition-all duration-300">
                                                    {token.name}
                                                </CardTitle>
                                                <Eye className="h-4 w-4 text-cyan-400/70 group-hover:text-cyan-300 transition-colors" />
                                            </div>
                                            <CardDescription className="text-cyan-400/70 font-mono flex items-center gap-1">
                                                <Hash className="h-3 w-3" />
                                                Token ID: {token.id}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4 relative z-10">
                                            <div>
                                                <p className="text-xs text-cyan-400/60 font-mono uppercase tracking-wider mb-1">Token Address</p>
                                                <p className="text-sm text-cyan-300 font-mono bg-black/30 px-2 py-1 rounded border border-cyan-500/20 truncate">
                                                    {token.address}
                                                </p>
                                            </div>
                                            <div className="flex justify-end">
                                                <Button 
                                                    asChild
                                                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-black font-mono font-bold shadow-lg shadow-cyan-500/30 border border-cyan-400"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <Link href={`/token/view/${token.id}`}>
                                                        <Eye className="h-4 w-4 mr-2" />
                                                        VIEW DETAILS
                                                    </Link>
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <Card className="group relative cyber-border max-w-2xl mx-auto">
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-lg opacity-50" />
                                <CardContent className="relative z-10 text-center py-16">
                                    <Coins className="h-16 w-16 text-cyan-400/50 mx-auto mb-6" />
                                    <h3 className="text-xl font-bold text-cyan-300 font-mono mb-2">NO TOKENS DEPLOYED</h3>
                                    <p className="text-cyan-400/70 font-mono mb-6">
                                        {">"} Deploy your first token to this factory
                                    </p>
                                    <DeployTokenPopup id={id} />
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>

                {/* Grid overlay */}
                <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
            </div>
        </ProtectedRoute>
    );
}
