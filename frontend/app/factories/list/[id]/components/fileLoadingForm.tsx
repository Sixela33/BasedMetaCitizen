import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { File, X } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

const MAX_FILES = 8
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export default function FileLoadingForm({files, setFiles, isLoading}: {
    files: File[], 
    setFiles:  React.Dispatch<React.SetStateAction<File[]>>,
    isLoading:boolean
}) {

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return
    
        const newFiles = Array.from(e.target.files)
        
        // Validate file size
        const oversizedFiles = newFiles.filter(file => file.size > MAX_FILE_SIZE)
        if (oversizedFiles.length > 0) {
          toast.error(`Some files exceed the 5MB limit: ${oversizedFiles.map(f => f.name).join(", ")}`)
          return
        }
    
        // Validate total number of files
        if (files.length + newFiles.length > MAX_FILES) {
          toast.error(`Maximum ${MAX_FILES} files allowed`)
          return
        }
        
        setFiles([...files, ...newFiles])    
    }
    
    const removeFile = (index: number) => {
      setFiles(files.filter((_, i) => i !== index))
    }

  return (
    <div className="mb-8">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Input
              type="file"
              onChange={handleFileChange}
              multiple
              className="w-full"
              accept="image/*"
              disabled={isLoading}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Select up to {MAX_FILES} files (max 5MB each)</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

    {files.length > 0 && (
      <div className="space-y-2 mt-4">
        {files.map((file, index) => (
          <Card key={`${file.name}-${index}`} className="bg-secondary/20">
            <CardContent className="flex items-center justify-between p-3">
              <div className="flex items-center gap-2 flex-1">
                <File className="h-4 w-4" />
                <span className="truncate">{file.name}</span>
                <span className="text-sm text-muted-foreground">
                  ({(file.size / 1024 / 1024).toFixed(2)}MB)
                </span>
              </div>
              {!isLoading && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(index)}
                  className="h-8 w-8 text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    )}

  </div>  
  )
}
