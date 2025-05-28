"use client"
import { Home, Building, Plus, LogOut, Key, Database, Monitor } from 'lucide-react'
import React from 'react'
import { Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenuItem, SidebarFooter, SidebarMenuButton, SidebarGroupContent, SidebarMenu } from './ui/sidebar';
import { useRouter } from 'next/navigation';
import ProfileLogin from './ProfileLogin';
import Link from 'next/link';

type SidebarItem = {
    label: string;
    href: string;
    icon: React.ElementType;
}
  
const sidebarItems: SidebarItem[] = [
    {
        label: "Dashboard",
        href: "/",
        icon: Monitor,
    },
    {
        label: "Factories",
        href: "/factories/list",
        icon: Building,
    },
    {
        label: "API Keys",
        href: "/api-keys",
        icon: Key,
    },
]

export default function CustomSidebar() {
    const navigate = useRouter();

    return (
    <Sidebar className="border-r border-cyan-500/30 bg-black/90 backdrop-blur-md">
        <SidebarHeader className="border-b border-cyan-500/30 p-6">
            <div className="flex items-center gap-3">
                <div className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-cyan-400 bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/50">
                    <div className="absolute inset-0 flex items-center justify-center text-black font-bold text-sm">M</div>
                    <div className="absolute inset-0 rounded-full border border-cyan-300 animate-pulse" />
                </div>
                <span className="text-lg font-bold text-cyan-300 tracking-wider font-mono hover:cursor-pointer" onClick={() => navigate.push("/")}>
                    META<span className="text-cyan-500">CITIZEN</span>
                </span>
            </div>
        </SidebarHeader>
        <SidebarContent className="bg-transparent">
            <SidebarGroup>
                <SidebarGroupLabel className="text-cyan-400/80 font-mono text-xs tracking-wider uppercase px-3 py-2">
                    System Modules
                </SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                    {sidebarItems.map((sidebarItem) => (
                        <SidebarMenuItem key={sidebarItem.label} className='h-12 mx-2'>
                            <SidebarMenuButton 
                                asChild 
                                className="hover:bg-cyan-500/10 hover:border-cyan-400/50 border border-transparent text-cyan-300 hover:text-cyan-100 transition-all duration-300 font-mono group"
                            >
                                <Link href={sidebarItem.href} className="flex items-center gap-3 px-3 py-2 rounded-md">
                                    <sidebarItem.icon className="h-5 w-5 group-hover:text-cyan-400 transition-colors" />
                                    <span className="group-hover:glow transition-all duration-300">{sidebarItem.label}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="border-t border-cyan-500/30 p-4 bg-transparent">
            <div className="w-full">
                <ProfileLogin />
            </div>
        </SidebarFooter>
    </Sidebar>
    )
}
