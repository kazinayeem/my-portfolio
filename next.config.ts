import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ignoreBuildErrors: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
    ],
  },
};

export default nextConfig;
