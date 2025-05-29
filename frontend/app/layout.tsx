"use client"
import "./globals.css";
import Providers from "./Providers";
import { Toaster } from "sonner";
import CustomSidebar from "@/components/CustomSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Metadata from "./metadata";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import Loading from "@/components/Loading";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname();
  const isOAuthRoute = pathname?.startsWith('/oauth') || pathname?.startsWith('/login') || pathname?.startsWith('/signup');

  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className="bg-black text-cyan-400 min-h-screen">
        <Metadata>
          <Providers>
              <div className="flex min-h-screen w-full bg-black">
              {!isOAuthRoute && (
                <div className="relative">
                  <CustomSidebar/>
                </div>
              )}
              <div className="flex flex-col w-full relative">
                {!isOAuthRoute && (
                  <div className="sticky top-0 z-50 border-b border-cyan-500/30 bg-black/80 backdrop-blur-md p-4">
                    <SidebarTrigger className="text-cyan-400 hover:text-cyan-300" />
                  </div>
                )}
                <Suspense fallback={<Loading />}>
                <div className={!isOAuthRoute ? "flex-1 w-full" : "min-h-screen"}>
                  {children}
                </div>
                </Suspense>
              </div>
            </div>
            <Toaster />
          </Providers>
        </Metadata>
      </body>
    </html>
  );
}
