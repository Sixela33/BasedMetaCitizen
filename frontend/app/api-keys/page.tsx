'use client'
import React, { useEffect, useState } from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'
import { proxyAxois } from '@/app/api/axios'
import Loading from '@/components/Loading'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { CopyIcon, PlusIcon, TrashIcon } from 'lucide-react'
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
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Your API Keys</h1>
                    <Button onClick={() => setShowNewKeyForm(true)} disabled={showNewKeyForm}>Create New API Key</Button>
                </div>

                {showNewKeyForm && (
                    <Card className="mb-4">
                        <CardHeader>
                            <CardTitle>Create New API Key</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(createApiKey)} className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>API Key Name</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="My API Key" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="space-y-4">
                                        <Label>Allowed Origins</Label>
                                        {form.watch('allowedOrigins').map((_, index) => (
                                            <div key={index} className="flex gap-2">
                                                <FormField
                                                    control={form.control}
                                                    name={`allowedOrigins.${index}`}
                                                    render={({ field }) => (
                                                        <FormItem className="flex-1">
                                                            <FormControl>
                                                                <Input {...field} placeholder="https://yourdomain.com" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() => removeOriginField(index)}
                                                    disabled={index === 0 && form.watch('allowedOrigins').length === 1}
                                                >
                                                    <TrashIcon className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                        <Button type="button" variant="outline" onClick={addOriginField} className="w-full">
                                            <PlusIcon className="h-4 w-4 mr-2" /> Add Origin
                                        </Button>
                                    </div>

                                    <div className="space-y-4">
                                        <Label>Redirect URLs (Optional)</Label>
                                        <div className="flex gap-2">
                                                <FormField
                                                    control={form.control}
                                                    name={`redirectUrl`}
                                                    render={({ field }) => (
                                                        <FormItem className="flex-1">
                                                            <FormControl>
                                                                <Input {...field} placeholder="https://yourdomain.com/callback" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() => removeRedirectUrlField()}
                                                >
                                                    <TrashIcon className="h-4 w-4" />
                                                </Button>
                                        </div>
                                        <Button type="button" variant="outline" onClick={addRedirectUrlField} className="w-full">
                                            <PlusIcon className="h-4 w-4 mr-2" /> Add Redirect URL
                                        </Button>
                                    </div>

                                    <div className="flex gap-2 justify-end">
                                        <Button type="button" variant="outline" onClick={() => setShowNewKeyForm(false)}>
                                            Cancel
                                        </Button>
                                        <Button type="submit">Create API Key</Button>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle>API Keys</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {apiKeys.map((key) => (
                                <li key={key.id} className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <div className="space-y-1">
                                            <h3 className="font-medium">{key.name}</h3>
                                            <span 
                                                onClick={() => copyToClipboard(key.key)}
                                                className="cursor-pointer text-sm text-muted-foreground flex items-center gap-2"
                                            >
                                                {key.key.substring(0, 8)}...{key.key.substring(key.key.length - 8)}
                                                <CopyIcon className="w-4 h-4" />
                                            </span>
                                        </div>
                                        <Button variant="destructive" onClick={() => deleteApiKey(key.id)}>Delete</Button>
                                    </div>
                                    <div className="text-sm space-y-1">
                                        <p><strong>Allowed Origins:</strong></p>
                                        <ul className="list-disc list-inside">
                                            {key.allowedOrigins?.map((origin: string, index: number) => (
                                                <li key={index}>{origin}</li>
                                            ))}
                                        </ul>
                                        {key.redirectUrls?.length > 0 && (
                                            <>
                                                <p><strong>Redirect URLs:</strong></p>
                                                <ul className="list-disc list-inside">
                                                    {key.redirectUrls.map((url: string, index: number) => (
                                                        <li key={index}>{url}</li>
                                                    ))}
                                                </ul>
                                            </>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </ProtectedRoute>
    )
}
