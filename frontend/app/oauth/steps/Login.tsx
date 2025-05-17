import { usePrivy } from '@privy-io/react-auth';
import React from 'react'
import { Button } from '@/components/ui/button'

export default function Login() {
    const {authenticated, login} = usePrivy();

    if (!authenticated) {
        return <Button onClick={login}>Login</Button>
    }

}