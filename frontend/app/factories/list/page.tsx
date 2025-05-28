'use client'
import React, { useEffect, useState } from 'react';
import { proxyAxois } from '@/app/api/axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Loading from '@/components/Loading';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Building, Plus, Eye, Calendar } from 'lucide-react';

export interface Factory {
  id: string;
  name: string;
  address: string;
  createdAt: string;
}

export default function ListFactories() {
  const [factories, setFactories] = useState<Factory[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchFactories = async () => {
    setLoading(true);
    try {
      const response = await proxyAxois.get('/organizations/factory');
      setFactories(response.data);
    } catch (error) {
      console.error('Error fetching factories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFactories();
  }, []);

  if (loading) return <Loading />;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black text-cyan-400 relative overflow-hidden">
        {/* Matrix Rain Background */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />
          <div className="absolute inset-0 opacity-10">
            <div className="matrix-rain" />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_70%)]" />
        </div>

        <div className="relative z-10 container mx-auto py-12 px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-mono mb-4">
              <span className="text-cyan-300">DEPLOYED</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                FACTORIES
              </span>
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-cyan-500 to-transparent mx-auto mb-6" />
          </div>

          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-cyan-500/20 border border-cyan-400 flex items-center justify-center">
                <Building className="h-6 w-6 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold font-mono text-cyan-300">CREATED FACTORIES</h2>
            </div>
            <Button 
              asChild
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-black font-mono font-bold shadow-lg shadow-cyan-500/30 border border-cyan-400"
            >
              <Link href="/factories/create">
                <Plus className="h-4 w-4 mr-2" />
                CREATE NEW FACTORY
              </Link>
            </Button>
          </div>

          {factories.length > 0 ? (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
              {factories.map((factory) => (
                <Card 
                  key={factory.id} 
                  className="group relative cyber-border hover:cyber-glow transition-all duration-500 cursor-pointer"
                  onClick={() => router.push(`/organizations/list/${factory.id}`)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardHeader className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="h-10 w-10 rounded-lg bg-cyan-500/20 border border-cyan-400 flex items-center justify-center">
                        <Building className="h-5 w-5 text-cyan-400" />
                      </div>
                      <Eye className="h-4 w-4 text-cyan-400/70 group-hover:text-cyan-300 transition-colors" />
                    </div>
                    <CardTitle className="text-lg font-bold font-mono text-cyan-300 group-hover:glow transition-all duration-300">
                      {factory.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-cyan-400/60 font-mono uppercase tracking-wider mb-1">Contract Address</p>
                        <p className="text-sm text-cyan-300 font-mono bg-black/30 px-2 py-1 rounded border border-cyan-500/20 truncate">
                          {factory.address}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-cyan-400/70" />
                        <div>
                          <p className="text-xs text-cyan-400/60 font-mono uppercase tracking-wider">Deployed</p>
                          <p className="text-sm text-cyan-300 font-mono">
                            {new Date(factory.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="group relative cyber-border max-w-2xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-lg opacity-50" />
              <CardContent className="relative z-10 text-center py-16">
                <Building className="h-16 w-16 text-cyan-400/50 mx-auto mb-6" />
                <h3 className="text-xl font-bold text-cyan-300 font-mono mb-2">NO FACTORIES DEPLOYED</h3>
                <p className="text-cyan-400/70 font-mono mb-6">
                  {">"} Deploy your first organization factory to get started
                </p>
                <Button 
                  asChild
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-black font-mono font-bold shadow-lg shadow-cyan-500/30 border border-cyan-400"
                >
                  <Link href="/organizations/create">
                    <Plus className="h-4 w-4 mr-2" />
                    CREATE FIRST FACTORY
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
      </div>
    </ProtectedRoute>
  );
}