// declarations.d.ts
declare module "next-pwa" {
  import type { NextConfig } from "next";
  type PWAOptions = {
    dest: string;
    register?: boolean;
    skipWaiting?: boolean;
    disable?: boolean;
  };

  export default function withPWA(
    options: PWAOptions
  ): (nextConfig: NextConfig) => NextConfig;
}
