import React from 'react'
import ProtectedRoute from '@/components/ProtectedRoute';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Building, Users, Database, Eye, Code, Shield } from "lucide-react";
import Link from 'next/link';

export default function page() {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col bg-black text-cyan-400 overflow-hidden relative">
        {/* Matrix Rain Background */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />
          <div className="absolute inset-0 opacity-20">
            <div className="matrix-rain" />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_70%)]" />
        </div>

        {/* Hero Section */}
        <section className="relative py-32 md:py-40 z-10 ">
          <div className="container relative z-10 flex flex-row justify-evenly items-center space-x-10 w-full">
            <div className=" grid gap-12 md:grid-cols-2 md:gap-16 items-center">
              <div className="flex flex-col justify-center space-y-8">
                <div className="inline-flex items-center rounded-full border border-cyan-500/50 bg-cyan-500/10 px-4 py-2 text-sm font-mono font-semibold text-cyan-300 backdrop-blur-sm w-fit">
                  <span className="mr-2 h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                  ORGANIZATION PORTAL
                </div>
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tighter font-mono">
                    <span className="text-cyan-300">METACITIZEN</span>
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 animate-pulse">
                      ADMIN
                    </span>
                    <br />
                    <span className="text-cyan-500">PORTAL</span>
                  </h1>
                  <div className="h-1 w-32 bg-gradient-to-r from-cyan-500 to-transparent animate-pulse" />
                </div>
                <p className="max-w-[600px] text-lg text-cyan-200/80 font-mono leading-relaxed">
                  {">"} Manage your organization's digital identity
                  <br />
                  {">"} Control API keys and access permissions
                  <br />
                  {">"} Monitor system status and analytics
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-black font-mono font-bold shadow-lg shadow-cyan-500/30 border border-cyan-400"
                    asChild
                  >
                    <Link href="/organizations/create">
                      GET STARTED
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-cyan-500 text-cyan-300 hover:bg-cyan-500/10 hover:text-cyan-100 font-mono"
                  >
                    VIEW DOCS
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="w-64 h-64 rounded-full border-2 border-cyan-400/50 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 shadow-lg shadow-cyan-500/50 flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full border border-cyan-300/30 bg-black/50 flex items-center justify-center">
                      <Building className="h-24 w-24 text-cyan-400 animate-pulse" />
                    </div>
                  </div>
                  {/* Scanning line effect */}
                  <div className="absolute inset-0 overflow-hidden rounded-full">
                    <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ProtectedRoute>
  )
}
