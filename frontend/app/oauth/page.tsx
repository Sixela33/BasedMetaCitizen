'use client'

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { proxyAxois } from "../api/axios";
import { usePrivy } from "@privy-io/react-auth";
import Login from "./steps/Login";
import Choice from "./steps/Choice";

export default function OAuthPage() {

    const [keyData, setKeyData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    const {user} = usePrivy();

    // get the api key from the url
    const searchParams = useSearchParams();
    const apiKey = searchParams.get('apiKey');
    const walletToLink = searchParams.get('walletToLink');

    console.log("walletToLink", walletToLink);

    useEffect(() => {
        const fetchKeyData = async () => {
            if (apiKey) {
                try {
                    setIsLoading(true);
                    // call the api to get the user
                    const response = await proxyAxois.get(`/user/api-keys/${apiKey}`);
                    console.log("key data",response.data);
                    setKeyData(response.data);
                } catch (error) {
                    console.error("Error fetching key data:", error);
                } finally {
                    setIsLoading(false);
                }
            }
        }
        fetchKeyData();
    }, []);
    

    if (!walletToLink) {
        return <div>Invalid url parameters</div>
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!keyData) {
        return <div>Invalid Key</div>
    }

    if (!user) {
        return <Login />
    }

    return (
       <Choice keyData={keyData} walletToLink={walletToLink} />
    )
}