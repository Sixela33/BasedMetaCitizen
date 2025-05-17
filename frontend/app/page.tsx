import React from 'react'
import ProtectedRoute from '@/components/ProtectedRoute';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Building, Users } from "lucide-react";
import Link from 'next/link';

export default function page() {
  return (
    <ProtectedRoute>
      <div className="flex flex-col w-full">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 mx-auto">
          <div className="container px-4 md:px-6 text-center mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-evenly w-full gap-8">
              <div className="w-full md:w-1/2">
                <div className="space-y-2 max-w-3xl mx-auto">
                  <Badge className="inline-flex mb-2" variant="outline">
                    Organization Portal
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Welcome to the Organization Portal</h1>
                  <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl py-2">
                    Manage your organization's digital identity and assets.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-center mt-4">
                  <Button size="lg" className="gap-1" asChild>
                    <Link href="/organizations/create">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ProtectedRoute>
  )
}
