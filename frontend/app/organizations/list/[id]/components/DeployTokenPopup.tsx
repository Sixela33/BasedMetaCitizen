import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import React from 'react'
import { proxyAxois } from '@/app/api/axios';
import { Input } from '@/components/ui/input';
import FileLoadingForm from './fileLoadingForm';
import { useState } from 'react';
import { uploadFile, uploadJson } from '@/app/hooks/pinata';
import { Label } from '@radix-ui/react-dropdown-menu';
import { toast } from 'sonner';

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
                <Button onClick={() => setIsOpen(true)}>Deploy Token</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Deploy Token</DialogTitle>
                </DialogHeader>
                <DialogDescription className='space-y-4'>
                    <FileLoadingForm files={files} setFiles={setFiles} isLoading={isLoading} onSubmit={() => {}} />
                    <div className='space-y-2'>
                      <Label>Name</Label>
                      <Input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Token name" />
                    </div>
                    <div className='space-y-2'>
                      <Label>Symbol</Label>
                      <Input value={symbol} onChange={(e) => setSymbol(e.target.value)} type="text" placeholder="Token symbol" />
                    </div>
                    <div className='space-y-2'>
                      <Label>Initial supply</Label>
                      <Input value={initialSupply} onChange={(e) => setInitialSupply(Number(e.target.value))} type="number" placeholder="Token initial supply" />
                    </div>
                    <Button 
                      onClick={deployToken} 
                      className='w-full'
                      disabled={isLoading}
                    >
                      {isLoading ? 'Deploying...' : 'Deploy'}
                    </Button>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}
