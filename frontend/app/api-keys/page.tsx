'use client'
import React, { useEffect, useState } from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'
import { proxyAxois } from '@/app/api/axios'
import Loading from '@/components/Loading'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { CopyIcon } from 'lucide-react'

export default function ApiKeysPage() {
    const [apiKeys, setApiKeys] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    const fetchApiKeys = async () => {
        setLoading(true)
        try {
            const response = await proxyAxois.get('/user/api-keys')
            setApiKeys(response.data)
        } catch (error) {
            console.error('Error fetching API keys:', error)
        } finally {
            setLoading(false)
        }
    }

    const createApiKey = async () => {
        setLoading(true)
        try {
            const response = await proxyAxois.post('/user/api-keys')
            setApiKeys(prevKeys => [...prevKeys, response.data])
        } catch (error) {
            console.error('Error creating API key:', error)
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

    useEffect(() => {
        fetchApiKeys()
    }, [])

    if (loading) return <Loading />

    return (
        <ProtectedRoute>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Your API Keys</h1>
                    <Button onClick={createApiKey}>Create New API Key</Button>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>API Keys</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {apiKeys.map((key) => (
                                <li key={key.id} className="flex justify-between items-center">
                                    <span 
                                        onClick={() => copyToClipboard(key.key)}
                                        className="cursor-pointer flex items-center gap-2"
                                    >
                                        <span className="flex flex-row items-center gap-2">
                                            {key.key.substring(0, 8)} ... {key.key.substring(key.key.length - 8)}
                                            <CopyIcon className="w-4 h-4" />
                                        </span>
                                    </span>
                                    <Button variant="destructive" onClick={() => deleteApiKey(key.id)}>Delete</Button>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </ProtectedRoute>
    )
}
