'use client'
import React, { useEffect, useState } from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'
import { proxyAxois } from '@/app/api/axios'
import Loading from '@/components/Loading'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { CopyIcon, PlusIcon, TrashIcon, Key, Shield, Globe, Link } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const apiKeyFormSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    allowedOrigins: z.array(z.string()).min(1, 'At least one origin is required'),
    redirectUrl: z.string(),
})

type ApiKeyFormValues = z.infer<typeof apiKeyFormSchema>

export default function ApiKeysPage() {
    const [apiKeys, setApiKeys] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [showNewKeyForm, setShowNewKeyForm] = useState(false)

    const form = useForm<ApiKeyFormValues>({
        resolver: zodResolver(apiKeyFormSchema),
        defaultValues: {
            name: '',
            allowedOrigins: [''],
            redirectUrl: '',
        },
    })

    const fetchApiKeys = async () => {
        setLoading(true)
        try {
            const response = await proxyAxois.get('/user/api-keys')
            console.log(response.data)
            setApiKeys(response.data)
        } catch (error) {
            console.error('Error fetching API keys:', error)
        } finally {
            setLoading(false)
        }
    }

    const createApiKey = async (values: ApiKeyFormValues) => {
        setLoading(true)
        try {
            const response = await proxyAxois.post('/user/api-keys', {
                name: values.name,
                allowedOrigins: values.allowedOrigins.filter(Boolean),
                redirectUrl: values.redirectUrl,
            })
            setApiKeys(prevKeys => [...prevKeys, response.data])
            setShowNewKeyForm(false)
            form.reset()
            toast.success('API key created successfully')
        } catch (error) {
            console.error('Error creating API key:', error)
            toast.error('Failed to create API key')
        } finally {
            setLoading(false)
        }
    }

    const deleteApiKey = async (id: string) => {
        setLoading(true)
        try {
            await proxyAxois.delete(`/user/api-keys/${id}`)
            setApiKeys(prevKeys => prevKeys.filter(key => key.id !== id))
        } catch (error) {
            console.error('Error deleting API key:', error)
        } finally {
            setLoading(false)
        }
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            toast.success('API key copied to clipboard');
        }).catch(err => {
            toast.error('Failed to copy API key');
        });
    }

    const addOriginField = () => {
        const currentOrigins = form.getValues('allowedOrigins')
        form.setValue('allowedOrigins', [...currentOrigins, ''])
    }

    const removeOriginField = (index: number) => {
        const currentOrigins = form.getValues('allowedOrigins')
        form.setValue('allowedOrigins', currentOrigins.filter((_, i) => i !== index))
    }

    const addRedirectUrlField = () => {
        const currentUrls = form.getValues('redirectUrl') || ''
        form.setValue('redirectUrl', currentUrls)
    }

    const removeRedirectUrlField = () => {
        form.setValue('redirectUrl', '')
    }

    useEffect(() => {
        fetchApiKeys()
    }, [])

    if (loading) return <Loading />

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

                <div className="relative z-10 container mx-auto py-12 px-4 space-y-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold font-mono mb-4">
                            <span className="text-cyan-300">API</span>{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                                KEYS
                            </span>
                        </h1>
                        <div className="h-1 w-32 bg-gradient-to-r from-cyan-500 to-transparent mx-auto mb-6" />
                    </div>

                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-lg bg-cyan-500/20 border border-cyan-400 flex items-center justify-center">
                                <Key className="h-6 w-6 text-cyan-400" />
                            </div>
                            <h2 className="text-2xl font-bold font-mono text-cyan-300">YOUR API KEYS</h2>
                        </div>
                        <Button 
                            onClick={() => setShowNewKeyForm(true)} 
                            disabled={showNewKeyForm}
                            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-black font-mono font-bold shadow-lg shadow-cyan-500/30 border border-cyan-400"
                        >
                            <PlusIcon className="h-4 w-4 mr-2" />
                            CREATE NEW API KEY
                        </Button>
                    </div>

                    {showNewKeyForm && (
                        <Card className="group relative cyber-border hover:cyber-glow transition-all duration-500 mb-8">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <CardHeader className="relative z-10">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="h-12 w-12 rounded-lg bg-cyan-500/20 border border-cyan-400 flex items-center justify-center">
                                        <Shield className="h-6 w-6 text-cyan-400" />
                                    </div>
                                    <CardTitle className="text-xl font-bold font-mono text-cyan-300">
                                        CREATE NEW API KEY
                                    </CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="relative z-10">
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(createApiKey)} className="space-y-6">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-cyan-300 font-mono">API Key Name</FormLabel>
                                                    <FormControl>
                                                        <Input 
                                                            {...field} 
                                                            placeholder="My API Key" 
                                                            className="bg-black/50 border-cyan-500/30 text-cyan-100 placeholder:text-cyan-400/50 focus:border-cyan-400 font-mono"
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-red-400" />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2">
                                                <Globe className="h-4 w-4 text-cyan-400" />
                                                <Label className="text-cyan-300 font-mono">Allowed Origins</Label>
                                            </div>
                                            {form.watch('allowedOrigins').map((_, index) => (
                                                <div key={index} className="flex gap-2">
                                                    <FormField
                                                        control={form.control}
                                                        name={`allowedOrigins.${index}`}
                                                        render={({ field }) => (
                                                            <FormItem className="flex-1">
                                                                <FormControl>
                                                                    <Input 
                                                                        {...field} 
                                                                        placeholder="https://yourdomain.com" 
                                                                        className="bg-black/50 border-cyan-500/30 text-cyan-100 placeholder:text-cyan-400/50 focus:border-cyan-400 font-mono"
                                                                    />
                                                                </FormControl>
                                                                <FormMessage className="text-red-400" />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="icon"
                                                        onClick={() => removeOriginField(index)}
                                                        disabled={index === 0 && form.watch('allowedOrigins').length === 1}
                                                        className="bg-red-600/20 border-red-500/50 hover:bg-red-600/30"
                                                    >
                                                        <TrashIcon className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                            <Button 
                                                type="button" 
                                                variant="outline" 
                                                onClick={addOriginField} 
                                                className="w-full border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 font-mono"
                                            >
                                                <PlusIcon className="h-4 w-4 mr-2" /> Add Origin
                                            </Button>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2">
                                                <Link className="h-4 w-4 text-cyan-400" />
                                                <Label className="text-cyan-300 font-mono">Redirect URLs (Optional)</Label>
                                            </div>
                                            <div className="flex gap-2">
                                                <FormField
                                                    control={form.control}
                                                    name={`redirectUrl`}
                                                    render={({ field }) => (
                                                        <FormItem className="flex-1">
                                                            <FormControl>
                                                                <Input 
                                                                    {...field} 
                                                                    placeholder="https://yourdomain.com/callback" 
                                                                    className="bg-black/50 border-cyan-500/30 text-cyan-100 placeholder:text-cyan-400/50 focus:border-cyan-400 font-mono"
                                                                />
                                                            </FormControl>
                                                            <FormMessage className="text-red-400" />
                                                        </FormItem>
                                                    )}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() => removeRedirectUrlField()}
                                                    className="bg-red-600/20 border-red-500/50 hover:bg-red-600/30"
                                                >
                                                    <TrashIcon className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="flex gap-2 justify-end pt-4 border-t border-cyan-500/30">
                                            <Button 
                                                type="button" 
                                                variant="outline" 
                                                onClick={() => setShowNewKeyForm(false)}
                                                className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 font-mono"
                                            >
                                                Cancel
                                            </Button>
                                            <Button 
                                                type="submit"
                                                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-black font-mono font-bold shadow-lg shadow-cyan-500/30 border border-cyan-400"
                                            >
                                                Create API Key
                                            </Button>
                                        </div>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                    )}

                    <Card className="group relative cyber-border hover:cyber-glow transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <CardHeader className="relative z-10">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="h-12 w-12 rounded-lg bg-cyan-500/20 border border-cyan-400 flex items-center justify-center">
                                    <Key className="h-6 w-6 text-cyan-400" />
                                </div>
                                <CardTitle className="text-xl font-bold font-mono text-cyan-300">
                                    ACTIVE API KEYS
                                </CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            {apiKeys.length === 0 ? (
                                <div className="text-center py-12">
                                    <Key className="h-16 w-16 text-cyan-400/50 mx-auto mb-4" />
                                    <p className="text-cyan-300/70 font-mono">No API keys found</p>
                                    <p className="text-cyan-400/50 font-mono text-sm mt-2">Create your first API key to get started</p>
                                </div>
                            ) : (
                                <ul className="space-y-6">
                                    {apiKeys.map((key) => (
                                        <li key={key.id} className="p-6 rounded-lg border border-cyan-500/30 bg-black/30 hover:bg-cyan-500/5 transition-all duration-300">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="space-y-2">
                                                    <h3 className="font-bold text-cyan-300 font-mono text-lg">{key.name}</h3>
                                                    <div 
                                                        onClick={() => copyToClipboard(key.key)}
                                                        className="cursor-pointer text-sm text-cyan-400/80 flex items-center gap-2 hover:text-cyan-300 transition-colors font-mono group"
                                                    >
                                                        <span className="bg-black/50 px-3 py-1 rounded border border-cyan-500/30">
                                                            {key.key.substring(0, 8)}...{key.key.substring(key.key.length - 8)}
                                                        </span>
                                                        <CopyIcon className="w-4 h-4 group-hover:text-cyan-300" />
                                                    </div>
                                                </div>
                                                <Button 
                                                    variant="destructive" 
                                                    onClick={() => deleteApiKey(key.id)}
                                                    className="bg-red-600/20 border-red-500/50 hover:bg-red-600/30 text-red-400 hover:text-red-300 font-mono"
                                                >
                                                    <TrashIcon className="h-4 w-4 mr-2" />
                                                    Delete
                                                </Button>
                                            </div>
                                            <div className="text-sm space-y-3 border-t border-cyan-500/20 pt-4">
                                                <div>
                                                    <p className="text-cyan-300 font-mono font-semibold mb-2 flex items-center gap-2">
                                                        <Globe className="h-4 w-4" />
                                                        Allowed Origins:
                                                    </p>
                                                    <ul className="space-y-1 ml-6">
                                                        {key.allowedOrigins?.map((origin: string, index: number) => (
                                                            <li key={index} className="text-cyan-400/80 font-mono text-sm bg-black/30 px-2 py-1 rounded border border-cyan-500/20">
                                                                {origin}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                {key.redirectUrls?.length > 0 && (
                                                    <div>
                                                        <p className="text-cyan-300 font-mono font-semibold mb-2 flex items-center gap-2">
                                                            <Link className="h-4 w-4" />
                                                            Redirect URLs:
                                                        </p>
                                                        <ul className="space-y-1 ml-6">
                                                            {key.redirectUrls.map((url: string, index: number) => (
                                                                <li key={index} className="text-cyan-400/80 font-mono text-sm bg-black/30 px-2 py-1 rounded border border-cyan-500/20">
                                                                    {url}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Grid overlay */}
                <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
            </div>
        </ProtectedRoute>
    )
}
