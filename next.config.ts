import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Redirects from old Tilda URLs will be added here (stage 3.8).
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;

