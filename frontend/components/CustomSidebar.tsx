"use client"
import { Home, Building, Plus, LogOut, Key } from 'lucide-react'
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
        label: "Home",
        href: "/",
        icon: Home,
    },
    {
        label: "Your Factories",
        href: "/organizations/list",
        icon: Building,
    },
    {
        label: "Create Factory",
        href: "/organizations/create",
        icon: Plus,
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
    <Sidebar>
        <SidebarHeader>
            MetaCitizen
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                {sidebarItems.map((sidebarItem) => (
                    <SidebarMenuItem key={sidebarItem.label} className='h-10'>
                    <SidebarMenuButton asChild>
                        <Link href={sidebarItem.href}>
                            <sidebarItem.icon />
                            <span>{sidebarItem.label}</span>
                        </Link>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    </SidebarContent>
    <SidebarFooter className="flex justify-center w-full">
        <ProfileLogin />
    </SidebarFooter>
    </Sidebar>
    )
}
