'use client'
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { proxyAxois } from "../api/axios";
import { usePrivy } from "@privy-io/react-auth";
import Login from "./steps/Login";
import Choice from "./steps/Choice";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import SumsubButton from "@/components/SumsubButton";

export default function OAuthPage() {
    const [keyData, setKeyData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [kycStatus, setKycStatus] = useState<any>(null);
    const [refreshKycFlag, setRefreshKycFlag] = useState<boolean>(false);

    const {user} = usePrivy();

    // get the api key from the url
    const searchParams = useSearchParams();
    const apiKey = searchParams.get('apiKey');
    const walletToLink = searchParams.get('walletToLink');

    async function getKycStatus() {
        const res = await proxyAxois.get('/sumsub/kyc-status');
        setKycStatus(res.data);
    }
    
    useEffect(() => {
        getKycStatus();
    }, [refreshKycFlag]);

    useEffect(() => {
        const fetchKeyData = async () => {
            if (apiKey) {
                try {
                    setIsLoading(true);
                    setError(null);
                    // call the api to get the user
                    const response = await proxyAxois.get(`/user/api-keys/${apiKey}`);
                    setKeyData(response.data);
                } catch (error: any) {
                    console.error("Error fetching key data:", error);
                    setError(error.response?.data?.message || "Failed to validate API key");
                } finally {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
                setError("API key is required");
            }
        }
        fetchKeyData();
    }, [apiKey]);

    if (!walletToLink) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Card className="w-[400px]">
                    <CardHeader>
                        <CardTitle className="text-red-500">Invalid Request</CardTitle>
                        <CardDescription>
                            The wallet address to link is missing from the request.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Card className="w-[400px]">
                    <CardContent className="flex flex-col items-center justify-center py-10">
                        <Loader2 className="h-8 w-8 animate-spin mb-4" />
                        <p className="text-muted-foreground">Validating request...</p>
                    </CardContent>
                </Card>
            </div>
        );
    }


    if (!kycStatus || kycStatus?.list?.items?.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[60vh] max-w-[400px]">
                <SumsubButton refreshKycFlag={refreshKycFlag} setRefreshKycFlag={setRefreshKycFlag}/>
            </div>
        )
    }

    if (error || !keyData) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Card className="w-[400px]">
                    <CardHeader>
                        <CardTitle className="text-red-500">Authentication Failed</CardTitle>
                        <CardDescription>
                            {error || "Invalid API key"}
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        );
    }

    if (!user) {
        return <Login />;
    }

    return (
        <Choice keyData={keyData} walletToLink={walletToLink} />
    );
}