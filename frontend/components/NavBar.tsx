'use client'
import { usePrivy } from '@privy-io/react-auth';
import React from 'react'
import { Button } from './ui/button';
import Link from 'next/link';
import { Card } from './ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Menu } from 'lucide-react';
import Image from 'next/image'
import ProfileLogin from './ProfileLogin';

const FRONT_API_URL = process.env.NEXT_PUBLIC_USERS_API_URL;

const navbarItems = [
    {
      label: "Organizations",
      href: "/organizations/list",
    },
  ]

export default function NavBar() {
    const {authenticated, login, logout} = usePrivy();

   
    /**
    const smartWallet = user?.linkedAccounts.find((account) => account.type === 'smart_wallet');
    const userAddress = smartWallet?.address;
    
     * 
    function copyAddress() {
      navigator.clipboard.writeText(userAddress || "")
      toast.success("Address copied to clipboard")
    }
    */

  return (
    <Card className="flex flex-row w-full bg-card py-3 px-4 border-0 items-center justify-between gap-6 rounded-2xl mt-5">
    <Link href={`${FRONT_API_URL}`}>
      <Image
        src="/meta_citizen_logo.png"
        height={80}
        width={120}
        className="border border-gray-300 rounded-xl p-1 hover:shadow-lg transition"
        alt="Meta Citizen Logo"
      />
    </Link>
    <ul className="hidden md:flex items-left gap-10 text-card-foreground">        
      {navbarItems.map((item, index) => (
        <li key={index} className="text-primary font-medium">
          <Link href={item.href}>{item.label}</Link>
        </li>
      ))}
    </ul>

    <div className="flex items-center w-full justify-end">
      <ProfileLogin />

      <div className="flex md:hidden mr-2 items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5 rotate-0 scale-100" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {
              navbarItems.map((item, index) => (
                <DropdownMenuItem key={index}>
                  <Link href={item.href}>{item.label}</Link>
                </DropdownMenuItem>
              ))
            }
            {authenticated ? (
              <>
                <DropdownMenuItem onClick={logout}>
                  Logout
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem>
                <Button className="w-full text-sm" onClick={login}>Sign Up</Button>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </Card>
  )
}
