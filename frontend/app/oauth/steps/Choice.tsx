import { proxyAxois } from '@/app/api/axios';
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import React from 'react'
import IdentityFactory from '@/lib/abis/IdentityFactory.json'
import { usePrivy, useSignTransaction } from '@privy-io/react-auth';
import { ethers } from 'ethers';


export default function Choice({keyData, walletToLink}: {keyData: any, walletToLink: string}) {    
    const {signTransaction} = useSignTransaction()

    function navigateToRedirectUrl() {
        if (keyData.redirectUrl) {
            window.location.href = keyData.redirectUrl;
        }
    }

    async function fetchUserIdentity() {
        const response = await proxyAxois.get(`/user/identity`);
        console.log("user identity",response.data);
        const {identity, identityFactoryAddress} = response.data;
        return {identity, identityFactoryAddress};
    }

    async function allowAccess() {
        const {identity, identityFactoryAddress} = await fetchUserIdentity();
        console.log("user identity", {
            identity,
            identityFactoryAddress,
            walletToLink
        });
        
        try {
            // Create contract interface for the transaction
            const factoryInterface = new ethers.Interface(IdentityFactory.abi);
            
            // Encode the function call
            const data = factoryInterface.encodeFunctionData("linkWallet", [
                identity,
                walletToLink
            ]);
            
            // Create the transaction
            const transaction = {
                to: identityFactoryAddress,
                data: data,
            };
            
            // Sign and send the transaction
            const signedTx = await signTransaction(transaction);
            console.log("Transaction signed:", signedTx);
            
            // After successful linking, navigate to redirect URL
            navigateToRedirectUrl();
        } catch (error) {
            console.error("Error linking wallet:", error);
            // Handle error appropriately
        }
    }

    function denyAccess() {
        navigateToRedirectUrl();
    }

  return (
    <div className="flex flex-col gap-4 text-center mx-auto w-1/2 mt-16">
    <Card>
        <CardHeader>
            <CardTitle>{keyData.name}</CardTitle>
            <CardDescription>Is requesting access to your Identity</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Allow access?</p>
            <div className="flex gap-2 mx-auto items-center justify-center mt-4">
                <div className="flex gap-2">
                    <Button variant="outline" onClick={denyAccess}>Deny</Button>
                    <Button onClick={allowAccess}>Allow</Button>
                </div>
        </div>
        </CardContent>
    </Card>
</div>
  )
}