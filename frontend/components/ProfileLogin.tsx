import { usePrivy } from '@privy-io/react-auth';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import React from 'react'
import { toast } from 'sonner';
import { Button } from './ui/button';
import { UserCircle, UserPlus } from 'lucide-react';

export default function ProfileLogin() {
    const {authenticated, login, logout, user} = usePrivy();

    const smartWallet = user?.linkedAccounts.find((account) => account.type === 'wallet');
    const userAddress = smartWallet?.address;
    
    function copyAddress() {
        navigator.clipboard.writeText(userAddress || "")
        toast.success("Address copied to clipboard")
      }
        
    return (
        <div>
        {authenticated ? (
            <>
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="hidden md:flex gap-2">
                    <UserCircle className="h-5 w-5" />
                    {userAddress?.slice(0, 6)}...{userAddress?.slice(-4)}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={copyAddress}>
                    Copy address
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>
                    Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            </>
        ) : (
            <Button variant="outline" className="hidden md:block ml-2 mr-2" onClick={login}>
                <div className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5" />
                    Login
                </div>
            </Button>
        )}
        </div>
    )
}
