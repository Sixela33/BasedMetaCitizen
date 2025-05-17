import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Organizations | MetaCitizen",
    description: "Create token factories, define compliance rules through claims, and build regulated digital markets. Empower your organization with programmable access control on-chain.",
  };

export default function Metadata({children}: {children: React.ReactNode}) {
    return (
        <div>
            {children}
        </div>
    )
}