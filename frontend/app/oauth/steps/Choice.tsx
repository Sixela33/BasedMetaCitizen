import { proxyAxois } from '@/app/api/axios';
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import React from 'react'
import IdentityFactory from '@/lib/abis/IdentityFactory.json'
import { useSignTransaction } from '@privy-io/react-auth';


export default function Choice({keyData}: {keyData: any}) {

    const {signTransaction} = useSignTransaction()

    function navigateToRedirectUrl() {
        if (keyData.redirectUrl) {
            window.location.href = keyData.redirectUrl;
        }
    }

    async function fetchUserIdentity() {
        const response = await proxyAxois.get(`/user/identity`);
        console.log("user identity",response.data);
        const {userIdentity, IdentityFactory} = response.data;
        return {userIdentity, IdentityFactory};
    }

    async function allowAccess() {
        const {userIdentity, IdentityFactory} = await fetchUserIdentity();
        console.log("user identity",userIdentity);
        //navigateToRedirectUrl();
        // 
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