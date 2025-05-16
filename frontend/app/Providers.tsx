'use client'
import PrivyProviderWithTheme from '@/components/privyProviderWithTheme'
import React from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <PrivyProviderWithTheme>
          {children}
      </PrivyProviderWithTheme>
    </SidebarProvider>
 )
}
