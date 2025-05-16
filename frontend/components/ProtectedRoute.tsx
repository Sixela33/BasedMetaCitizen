"use client"
import { usePrivy } from '@privy-io/react-auth';
import React from 'react'
import { useRouter } from 'next/navigation';
import Loading from './Loading';

export default function ProtectedRoute({children}: {children: React.ReactNode}) {
    const {authenticated, ready} = usePrivy();
    const router = useRouter();

    if (!ready) {
        return <Loading />
    }
    
    if (!authenticated) {
        router.push('/login');
    }

    return <>{children}</>
}
