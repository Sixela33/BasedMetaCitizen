import { usePrivy } from '@privy-io/react-auth';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import React from 'react'
import { toast } from 'sonner';
import { Button } from './ui/button';
import { UserCircle, UserPlus, Copy, LogOut, Zap } from 'lucide-react';

export default function ProfileLogin() {
    const {authenticated, login, logout, user} = usePrivy();

    const smartWallet = user?.linkedAccounts.find((account) => account.type === 'wallet');
    const userAddress = smartWallet?.address;
    
    function copyAddress() {
        navigator.clipboard.writeText(userAddress || "")
        toast.success("Address copied to clipboard")
      }
        
    return (
        <div className="w-full">
        {authenticated ? (
            <>
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button 
                        variant="ghost" 
                        className="w-full justify-start gap-3 p-3 h-auto border border-cyan-500/30 bg-cyan-500/5 hover:bg-cyan-500/10 hover:border-cyan-400/50 text-cyan-300 hover:text-cyan-100 transition-all duration-300 font-mono"
                    >
                        <div className="flex items-center gap-3 w-full">
                            <div className="h-8 w-8 rounded-full border border-cyan-400 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center">
                                <UserCircle className="h-5 w-5 text-cyan-400" />
                            </div>
                            <div className="flex flex-col items-start flex-1 min-w-0">
                                <span className="text-xs text-cyan-400/80 uppercase tracking-wider">Connected</span>
                                <span className="text-sm truncate w-full">
                                    {userAddress?.slice(0, 8)}...{userAddress?.slice(-6)}
                                </span>
                            </div>
                            <Zap className="h-3 w-3 text-cyan-400 animate-pulse" />
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                    align="end" 
                    className="min-w-[200px] border border-cyan-500/30 bg-black/90 backdrop-blur-md p-2 rounded-md"
                >
                    <DropdownMenuItem 
                        onClick={copyAddress}
                        className="flex items-center gap-2 px-3 py-2 text-cyan-300 hover:text-cyan-100 hover:bg-cyan-500/10 rounded cursor-pointer font-mono text-sm transition-all duration-200"
                    >
                        <Copy className="h-4 w-4" />
                        Copy Address
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                        onClick={logout}
                        className="flex items-center gap-2 px-3 py-2 text-cyan-300 hover:text-red-400 hover:bg-red-500/10 rounded cursor-pointer font-mono text-sm transition-all duration-200"
                    >
                        <LogOut className="h-4 w-4" />
                        Disconnect
                    </DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            </>
        ) : (
            <Button 
                variant="outline" 
                className="w-full border-cyan-500 text-cyan-300 hover:bg-cyan-500/10 hover:text-cyan-100 font-mono" 
                onClick={login}
            >
                <div className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5" />
                    Login
                </div>
            </Button>
        )}
        </div>
    )
}
