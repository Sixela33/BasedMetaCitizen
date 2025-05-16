import type { Metadata } from "next";
import "./globals.css";
import Providers from "./Providers";
import { Toaster } from "sonner";
import CustomSidebar from "@/components/CustomSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
export const metadata: Metadata = {
  title: "Organizations | MetaCitizen",
  description: "Create token factories, define compliance rules through claims, and build regulated digital markets. Empower your organization with programmable access control on-chain.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {/* <NavBar/> */}
          <CustomSidebar/>
          <div className="flex flex-col w-full">
          <SidebarTrigger/>
          <div className="mt-16">
            {children}
          </div>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
