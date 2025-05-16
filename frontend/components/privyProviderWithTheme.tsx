import { PrivyProvider, PrivyClientConfig } from "@privy-io/react-auth";
import { baseSepolia } from 'viem/chains';
import { getConfig } from '@/app/config';

const config = getConfig();

const privyConfig: PrivyClientConfig = {
  defaultChain: baseSepolia,
  supportedChains: [baseSepolia],
  embeddedWallets: {
    createOnLogin: 'users-without-wallets'
  }
};

// Create a wrapper component for PrivyProvider to access theme
export default function PrivyProviderWithTheme({ children }: { children: React.ReactNode }) {    
    // Get the primary color from CSS variable
    /**
     * 
    const primaryColor = typeof window !== 'undefined' 
    ? getComputedStyle(document.documentElement).getPropertyValue('--primary').trim()
    : '#FF0000'; // Fallback color
    */
    
      
    return (
      <PrivyProvider
        appId={config.privyAppId}
        config={privyConfig}
      >
        {children}
      </PrivyProvider>
    );
  }
