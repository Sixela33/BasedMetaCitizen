'use client'
import { proxyAxois } from '@/app/api/axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';
import SuccessCard from '@/components/SucessCard'
import Loading from '@/components/Loading';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { MultipleSelect } from '@/components/ui/multipleSelect';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Building, Shield, Settings, Zap } from 'lucide-react';

// Enums
enum ComplianceModules {
  Chainalysis = 'Chainalysis',
}

enum Claims {
  KYC = 'KYC',
  AML = 'AML',
  KYB = 'KYB',
}

enum TokenType {
  ERC20 = 'ERC20'
}

enum SaleType {
  FixedPrice = 'Fixed Price',
  CrowdSale = 'Crowd Sale',
}

// Types
interface Factory {
  address: string;
  name: string;
  id: string;
}

interface SaleConfig {
  saleType: SaleType;
  totalPrice: number;
}

interface FactoryFormData {
  name: string;
  factoryType: TokenType;
  withSale: boolean;
  requiredClaims: string[];
  transferComplianceModules: string[];
  saleConfig?: SaleConfig;
}

// Schema de validación
const factoryFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  factoryType: z.nativeEnum(TokenType),
  withSale: z.boolean(),
  requiredClaims: z.array(z.string()),
  transferComplianceModules: z.array(z.string()),
  saleConfig: z.object({
    saleType: z.nativeEnum(SaleType),
    totalPrice: z.number().min(0, 'Price must be positive'),
  }).optional(),
});

export default function CreateFactory() {
  const [loading, setLoading] = React.useState(false);
  const [factoryCreated, setFactoryCreated] = React.useState<Factory | null>(null);

  const form = useForm<FactoryFormData>({
    resolver: zodResolver(factoryFormSchema),
    defaultValues: {
      name: '',
      factoryType: TokenType.ERC20,
      withSale: false,
      requiredClaims: [],
      transferComplianceModules: [],
      saleConfig: {
        saleType: SaleType.FixedPrice,
        totalPrice: 0,
      },
    },
  });

  const onSubmit = async (data: FactoryFormData) => {
    setLoading(true);
    try {
      const response = await proxyAxois.post('/organizations/factory', data);
      setFactoryCreated(response.data);
      form.reset();
    } catch (error) {
      console.error('Error creating factory:', error);
      // Aquí podrías agregar un toast o notificación de error
    } finally {
      setLoading(false);
    }
  };

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
          {factoryCreated && (
            <SuccessCard address={factoryCreated.address} name={factoryCreated.name} />
          )}
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center rounded-full border border-cyan-500/50 bg-cyan-500/10 px-4 py-2 text-sm font-mono font-semibold text-cyan-300 backdrop-blur-sm mb-6">
              <span className="mr-2 h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              ORGANIZATION FACTORY
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-mono mb-4">
              <span className="text-cyan-300">CREATE</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                ORGANIZATION
              </span>
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-cyan-500 to-transparent mx-auto mb-6" />
            <p className="text-cyan-200/80 font-mono text-lg max-w-2xl mx-auto">
              {">"} Deploy a new organization factory with custom compliance modules
              <br />
              {">"} Configure token standards and sale parameters
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-4xl mx-auto">
              {/* Factory Details */}
              <Card className="group relative cyber-border hover:cyber-glow transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-12 w-12 rounded-lg bg-cyan-500/20 border border-cyan-400 flex items-center justify-center">
                      <Building className="h-6 w-6 text-cyan-400" />
                    </div>
                    <CardTitle className="text-xl font-bold font-mono text-cyan-300">
                      FACTORY CONFIGURATION
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6 relative z-10">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-cyan-300 font-mono">Factory Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter factory name" 
                            autoComplete="off" 
                            className="bg-black/50 border-cyan-500/30 text-cyan-100 placeholder:text-cyan-400/50 focus:border-cyan-400 font-mono"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="factoryType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-cyan-300 font-mono">Token Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-black/50 border-cyan-500/30 text-cyan-100 focus:border-cyan-400 font-mono">
                              <SelectValue placeholder="Select Token Type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-black/90 border-cyan-500/30 backdrop-blur-md">
                            {Object.values(TokenType).map((type) => (
                              <SelectItem key={type} value={type} className="text-cyan-300 hover:bg-cyan-500/10 font-mono">
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Compliance and Claims */}
              <Card className="group relative cyber-border hover:cyber-glow transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-12 w-12 rounded-lg bg-cyan-500/20 border border-cyan-400 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-cyan-400" />
                    </div>
                    <CardTitle className="text-xl font-bold font-mono text-cyan-300">
                      COMPLIANCE MODULES
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                  <FormField
                    control={form.control}
                    name="transferComplianceModules"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-cyan-300 font-mono">Compliance Modules</FormLabel>
                        <FormControl>
                          <MultipleSelect
                            options={Object.values(ComplianceModules).map((module) => ({
                              value: module,
                              label: module,
                            }))}
                            selectedValues={field.value}
                            setSelectedValues={field.onChange}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="requiredClaims"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-cyan-300 font-mono">Required Claims</FormLabel>
                        <FormControl>
                          <MultipleSelect
                            options={Object.values(Claims).map((claim) => ({
                              value: claim,
                              label: claim,
                            }))}
                            selectedValues={field.value}
                            setSelectedValues={field.onChange}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Sale Configuration */}
              <Card className="group relative cyber-border hover:cyber-glow transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-12 w-12 rounded-lg bg-cyan-500/20 border border-cyan-400 flex items-center justify-center">
                      <Settings className="h-6 w-6 text-cyan-400" />
                    </div>
                    <CardTitle className="text-xl font-bold font-mono text-cyan-300">
                      SALE CONFIGURATION
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6 relative z-10">
                  <FormField
                    control={form.control}
                    name="withSale"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-4">
                        <FormLabel className="text-cyan-300 font-mono">Enable Sale</FormLabel>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-cyan-500/50 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-400"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {form.watch('withSale') && (
                    <div className="space-y-6 border-l-2 border-cyan-500/30 pl-6">
                      <FormField
                        control={form.control}
                        name="saleConfig.saleType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-cyan-300 font-mono">Sale Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-black/50 border-cyan-500/30 text-cyan-100 focus:border-cyan-400 font-mono">
                                  <SelectValue placeholder="Select Sale Type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-black/90 border-cyan-500/30 backdrop-blur-md">
                                {Object.values(SaleType).map((type) => (
                                  <SelectItem key={type} value={type} className="text-cyan-300 hover:bg-cyan-500/10 font-mono">
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="saleConfig.totalPrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-cyan-300 font-mono">Total Price</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                step="1"
                                className="bg-black/50 border-cyan-500/30 text-cyan-100 placeholder:text-cyan-400/50 focus:border-cyan-400 font-mono"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-black font-mono font-bold shadow-lg shadow-cyan-500/30 border border-cyan-400 h-14 text-lg"
              >
                <Zap className="mr-2 h-5 w-5" />
                DEPLOY ORGANIZATION FACTORY
              </Button>
            </form>
          </Form>
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
      </div>
    </ProtectedRoute>
  );
}
