import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Explicitly allow common local dev origins to prevent future warnings
    allowedDevOrigins: [
      "http://192.168.112.1",
      "http://192.168.112.1:3000",
      "http://localhost:3000",
      "http://127.0.0.1:3000",
    ],
  },
};

export default nextConfig;
