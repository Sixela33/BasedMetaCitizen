"use client"
import React from 'react'
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';

export default function page() {
    const {authenticated, login} = usePrivy();
    const router = useRouter();

    if (authenticated) {
        router.push('/');
    }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <h1>Login</h1>
        <div className='flex flex-col gap-4'>
            <Button onClick={login}><LogIn className='w-10 h-10' /> Login</Button>
        </div>
    </div>
  )
}
