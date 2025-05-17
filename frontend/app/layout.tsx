"use client"
import "./globals.css";
import Providers from "./Providers";
import { Toaster } from "sonner";
import CustomSidebar from "@/components/CustomSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Metadata from "./metadata";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname();
  const isOAuthRoute = pathname?.startsWith('/oauth');

  return (
    <html lang="en">
      <body>
        <Metadata>
          <Providers>
            {!isOAuthRoute && <CustomSidebar/>}
          <div className="flex flex-col w-full">
            {!isOAuthRoute && <SidebarTrigger/>}
            <div className={!isOAuthRoute ? "mt-16 mx-16" : ""}>
              {children}
            </div>
          </div>
          <Toaster />
        </Providers>
        </Metadata>
      </body>
    </html>
  );
}
