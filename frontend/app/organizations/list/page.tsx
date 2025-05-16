'use client'
import React, { useEffect, useState } from 'react';
import { proxyAxois } from '@/app/api/axios';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Loading from '@/components/Loading';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';

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
      <div className="p-8 flex flex-col flex-grow w-full">
        <div className="flex justify-between items-center mb-6 max-w-5xl mx-auto w-full">
          <h2 className="text-2xl font-bold">Created Factories</h2>
        <Link href="/organizations/create" passHref>
          <Button asChild>
            <a>Create new Factory</a>
          </Button>
        </Link>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 max-w-5xl mx-auto w-full">
        {factories.length > 0 ? (
          factories.map((factory) => (
            <Card key={factory.id} onClick={() => router.push(`/organizations/list/${factory.id}`)}>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-1">{factory.name}</h3>
                <p className="text-sm text-gray-600 truncate">Address: {factory.address}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500 w-full col-span-full">No factories created yet.</p>
        )}
      </div>
    </div>
    </ProtectedRoute>
  );
}