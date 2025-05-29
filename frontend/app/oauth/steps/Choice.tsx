import { proxyAxois } from '@/app/api/axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import React, { useState } from 'react';
import IdentityFactory from '@/lib/abis/IdentityFactory.json';
import { useSignTransaction } from '@privy-io/react-auth';
import { ethers } from 'ethers';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Choice({keyData, walletToLink}: {keyData: any, walletToLink: string}) {    
    const {signTransaction} = useSignTransaction();
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function navigateToRedirectUrl() {
        if (keyData.redirectUrl) {
            window.location.href = keyData.redirectUrl;
        }
    }

    async function fetchUserIdentity() {
        const response = await proxyAxois.get(`/user/identity`);
        const {identity, identityFactoryAddress} = response.data;
        return {identity, identityFactoryAddress};
    }

    async function allowAccess() {
        setIsProcessing(true);
        setError(null);
        
        try {
            const {identity, identityFactoryAddress} = await fetchUserIdentity();
            
            // Create contract interface for the transaction
            const factoryInterface = new ethers.Interface(IdentityFactory.abi);
            
            // Encode the function call
            const data = factoryInterface.encodeFunctionData("linkWallet", [
                identity,
                walletToLink
            ]);

            console.log("data", data);

            console.log("identityFactoryAddress", identityFactoryAddress);
            
            // Create the transaction
            const transaction = {
                to: identityFactoryAddress,
                data: data,
            };
            
            // Sign and send the transaction
            const signedTx = await signTransaction(transaction);

            console.log("signedTx", signedTx);

            console.log("Transaction signed:", signedTx);
            
            // After successful linking, navigate to redirect URL
            navigateToRedirectUrl();
        } catch (error: any) {
            console.error("Error linking wallet:", error);
            setError(error.message || "Failed to link wallet. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    }

    function denyAccess() {
        navigateToRedirectUrl();
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
            <Card className="w-full max-w-[500px]">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl mb-2">{keyData.name}</CardTitle>
                    <CardDescription className="text-lg">
                        Requesting Access to Your Identity
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="bg-muted p-4 rounded-lg">
                            <p className="font-medium mb-2">This application will be able to:</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                <li>Link to your MetaCitizen identity</li>
                                <li>View your basic profile information</li>
                                <li>Request identity verifications</li>
                            </ul>
                        </div>
                            <div className='flex flex-col gap-2'>
                                <p className='text-sm text-muted-foreground'>You are going to link <span className='font-bold'>{walletToLink}</span> to your identity</p>
                                <p className='text-sm text-muted-foreground text-red-500'>This will allow this wallet to operate in your name</p>
                            </div>
                        
                        {error && (
                            <Alert variant="destructive">
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center gap-3">
                    <Button
                        variant="outline"
                        onClick={denyAccess}
                        disabled={isProcessing}
                    >
                        Deny
                    </Button>
                    <Button
                        onClick={allowAccess}
                        disabled={isProcessing}
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Authorizing...
                            </>
                        ) : (
                            'Allow Access'
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}