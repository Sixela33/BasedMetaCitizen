import { PinataSDK } from "pinata-web3"

const getApiUrl = () => {
  if(process.env.BACKEND_URL) {
    return process.env.NEXT_PUBLIC_BACKEND_URL;
  }
  return 'http://localhost:8000/api';
}

export const getConfig = () => {
  return {
    privyAppId: process.env.NEXT_PUBLIC_PRIVY_APP_ID || 'default_app_id',
    apiUrl: getApiUrl(),
    gatewayUrl: process.env.NEXT_PUBLIC_GATEWAY_URL,
  }
}

export async function getPinataConfig() {
  if (!process.env.PINATA_JWT) {
    throw new Error('PINATA_JWT is required')
  }

  const config = getConfig()

  return new PinataSDK({
    pinataJwt: process.env.PINATA_JWT,
    pinataGateway: config.gatewayUrl
  })
} 