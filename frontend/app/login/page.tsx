"use client"
import React from 'react'
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn, Shield, Zap, Lock, Fingerprint, Cpu } from 'lucide-react';

export default function page() {
    const {authenticated, login} = usePrivy();
    const router = useRouter();

    if (authenticated) {
        router.push('/');
    }

    return (
        <div className="min-h-screen bg-black text-cyan-400 relative overflow-hidden flex items-center justify-center">
            {/* Matrix Rain Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />
                <div className="absolute inset-0 opacity-20">
                    <div className="matrix-rain" />
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_70%)]" />
            </div>

            {/* Grid overlay */}
            <div className="absolute inset-0 cyber-grid opacity-10" />

            {/* Login Content */}
            <div className="relative z-10 container mx-auto px-4 py-12">
                <div className="max-w-md mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center rounded-full border border-cyan-500/50 bg-cyan-500/10 px-4 py-2 text-sm font-mono font-semibold text-cyan-300 backdrop-blur-sm mb-6">
                            <span className="mr-2 h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                            SECURE ACCESS
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold font-mono mb-4">
                            <span className="text-cyan-300">META</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                                CITIZEN
                            </span>
                        </h1>
                        <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-transparent mx-auto mb-6" />
                    </div>

                    {/* Login Card */}
                    <Card className="group relative cyber-border hover:cyber-glow transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <CardHeader className="relative z-10 text-center">
                            <div className="flex justify-center mb-4">
                                <div className="relative">
                                    <div className="w-20 h-20 rounded-full border-2 border-cyan-400/50 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 shadow-lg shadow-cyan-500/50 flex items-center justify-center">
                                        <div className="w-16 h-16 rounded-full border border-cyan-300/30 bg-black/50 flex items-center justify-center">
                                            <Shield className="h-8 w-8 text-cyan-400 animate-pulse" />
                                        </div>
                                    </div>
                                    {/* Scanning line effect */}
                                    <div className="absolute inset-0 overflow-hidden rounded-full">
                                        <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan" />
                                    </div>
                                </div>
                            </div>
                            <CardTitle className="text-2xl font-bold font-mono text-cyan-300 mb-2">
                                SYSTEM ACCESS
                            </CardTitle>
                            <CardDescription className="text-cyan-400/70 font-mono">
                                Connect your wallet to authenticate
                            </CardDescription>
                        </CardHeader>
                        
                        <CardContent className="relative z-10 space-y-6">
                            {/* Login Button */}
                            <Button 
                                onClick={login}
                                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-black font-mono font-bold shadow-lg shadow-cyan-500/30 border border-cyan-400 h-14 text-lg"
                            >
                                <LogIn className="mr-3 h-6 w-6" />
                                AUTHENTICATE
                                <Zap className="ml-3 h-5 w-5 animate-pulse" />
                            </Button>

                            {/* Footer Info */}
                            <div className="text-center pt-4 border-t border-cyan-500/20">
                                <p className="text-xs text-cyan-400/60 font-mono">
                                    {">"} Powered by decentralized identity protocols
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
