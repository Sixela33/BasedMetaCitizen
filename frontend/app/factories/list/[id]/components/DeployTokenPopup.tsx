import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import React from 'react'
import { proxyAxois } from '@/app/api/axios';
import { Input } from '@/components/ui/input';
import FileLoadingForm from './fileLoadingForm';
import { useState } from 'react';
import { uploadFile, uploadJson } from '@/app/hooks/pinata';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Zap, Plus, Loader2 } from 'lucide-react';

export default function DeployTokenPopup({id, onTokenDeployed}: {id: string, onTokenDeployed?: () => void}) {
    
    const [files, setFiles] = useState<File[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState('')
    const [symbol, setSymbol] = useState('')
    const [initialSupply, setInitialSupply] = useState(10000000)
    const [isOpen, setIsOpen] = useState(false)

    const deployToken = async () => {
        setIsLoading(true)
        try {
            const fileUris = await handleFileUpload(files)
            const jsonUri = await handleJsonUpload()
            const response = await proxyAxois.post(`/organizations/factory/${id}/token`, {
              jsonUri,
              fileUris,
              data: {
                name,
                symbol,
                decimals: 18,
                initialSupply
              }
            });
            console.log(response.data);
            toast.success(`Token ${name} (${symbol}) has been successfully deployed.`);
            setIsOpen(false);
            
            // Call the callback to refresh the token list
            if (onTokenDeployed) {
              onTokenDeployed();
            }
        } catch (error) {
            console.error(error);
            toast.error("Deployment failed", {
              description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        } finally {
            setIsLoading(false)
        }
    }

    const handleFileUpload = async (files: File[]): Promise<string[]> => {
        const fileUrls: string[] = []
        
        for (const file of files) {
          try {
            const fileUrl = await uploadFile(file)
            fileUrls.push(fileUrl)
          } catch (error) {
            throw new Error(`Error uploading file ${file.name}: ${error instanceof Error ? error.message : 'Unknown error'}`)
          }
        }
        
        return fileUrls
    }
    
    const handleJsonUpload = async () => {
      try {
        const tokenMetadata = {
            name: name,
            symbol: symbol,
            decimals: 18,
            initialSupply: initialSupply,
        }
  
        const jsoncid = await uploadJson(tokenMetadata)
        return jsoncid
      } catch (error) {
        throw new Error(`Error uploading JSON: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button 
                    onClick={() => setIsOpen(true)}
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-black font-mono font-bold shadow-lg shadow-cyan-500/30 border border-cyan-400"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    DEPLOY TOKEN
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-black/90 border-cyan-500/30 backdrop-blur-md max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-lg bg-cyan-500/20 border border-cyan-400 flex items-center justify-center">
                            <Zap className="h-5 w-5 text-cyan-400" />
                        </div>
                        <DialogTitle className="text-xl font-bold font-mono text-cyan-300">
                            DEPLOY TOKEN
                        </DialogTitle>
                    </div>
                </DialogHeader>
                <DialogDescription className='space-y-6 text-cyan-400/70 font-mono'>
                    <FileLoadingForm files={files} setFiles={setFiles} isLoading={isLoading} />
                    
                    <div className='space-y-2'>
                        <Label className="text-cyan-300 font-mono">Token Name</Label>
                        <Input 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            type="text" 
                            placeholder="Enter token name" 
                            className="bg-black/50 border-cyan-500/30 text-cyan-100 placeholder:text-cyan-400/50 focus:border-cyan-400 font-mono"
                        />
                    </div>

                    <div className='space-y-2'>
                        <Label className="text-cyan-300 font-mono">Token Symbol</Label>
                        <Input 
                            value={symbol} 
                            onChange={(e) => setSymbol(e.target.value)} 
                            type="text" 
                            placeholder="e.g., BTC, ETH" 
                            className="bg-black/50 border-cyan-500/30 text-cyan-100 placeholder:text-cyan-400/50 focus:border-cyan-400 font-mono"
                        />
                    </div>

                    <div className='space-y-2'>
                        <Label className="text-cyan-300 font-mono">Initial Supply</Label>
                        <Input 
                            value={initialSupply} 
                            onChange={(e) => setInitialSupply(Number(e.target.value))} 
                            type="number" 
                            placeholder="10000000" 
                            className="bg-black/50 border-cyan-500/30 text-cyan-100 placeholder:text-cyan-400/50 focus:border-cyan-400 font-mono"
                        />
                    </div>

                    <Button 
                        onClick={deployToken} 
                        className='w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-black font-mono font-bold shadow-lg shadow-cyan-500/30 border border-cyan-400 h-12'
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                DEPLOYING...
                            </>
                        ) : (
                            <>
                                <Zap className="h-4 w-4 mr-2" />
                                DEPLOY TOKEN
                            </>
                        )}
                    </Button>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}
