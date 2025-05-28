'use client'
import PrivyProviderWithTheme from '@/components/privyProviderWithTheme'
import React from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'
import { ThemeProvider } from '@/components/ui/theme-provider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <SidebarProvider>
        <PrivyProviderWithTheme>
            {children}
        </PrivyProviderWithTheme>
      </SidebarProvider>
    </ThemeProvider>
  )
}
