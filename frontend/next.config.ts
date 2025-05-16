import type { NextConfig } from "next";

const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true"
  },
  eslint: {
    ignoreDuringBuilds: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true"
  },
  compiler: {
    removeConsole: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true"
  },
};

export default nextConfig;



