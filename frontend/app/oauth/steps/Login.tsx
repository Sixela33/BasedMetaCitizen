import { usePrivy } from '@privy-io/react-auth';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Login() {
    const { authenticated, login } = usePrivy();

    if (!authenticated) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Card className="w-[400px]">
                    <CardHeader>
                        <CardTitle>Welcome to MetaCitizen</CardTitle>
                        <CardDescription>
                            Please login to continue with the authorization process
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <Button 
                            size="lg"
                            onClick={login}
                            className="px-8"
                        >
                            Connect Wallet
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }
    return null;
}