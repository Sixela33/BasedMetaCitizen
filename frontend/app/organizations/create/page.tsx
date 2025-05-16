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
import { usePrivy } from '@privy-io/react-auth';
import ProtectedRoute from '@/components/ProtectedRoute';
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
  const { authenticated, ready } = usePrivy();

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
      <div className='container mx-auto'>
          {factoryCreated && (
          <SuccessCard address={factoryCreated.address} name={factoryCreated.name} />
        )}
      <h1 className='text-2xl font-bold mb-6 text-center'>Create Factory</h1>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 max-w-2xl mx-auto'>
          {/* Factory Details */}
          <Card>
            <CardHeader>
              <CardTitle>Factory Details</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Factory Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter factory name' autoComplete="off" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="factoryType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Token Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select Token Type' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(TokenType).map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Compliance and Claims */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance and Claims</CardTitle>
            </CardHeader>
            <CardContent className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name="transferComplianceModules"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Compliance Modules</FormLabel>
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="requiredClaims"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Required Claims</FormLabel>
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Sale Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Sale Configuration</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <FormField
                control={form.control}
                name="withSale"
                render={({ field }) => (
                  <FormItem className='flex items-center space-x-4'>
                    <FormLabel>Enable Sale</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {form.watch('withSale') && (
                <div className='space-y-4'>
                  <FormField
                    control={form.control}
                    name="saleConfig.saleType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sale Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Select Sale Type' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.values(SaleType).map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="saleConfig.totalPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            step="1"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <Button type="submit" className='w-full'>
            Create Factory
          </Button>
        </form>
      </Form>
    </div>
    </ProtectedRoute>
  );
}
