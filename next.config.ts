import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // add pathname wildcard too
      },
    ],
    dangerouslyAllowLocalIP:true
  },
};

export default nextConfig;
