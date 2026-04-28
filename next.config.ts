import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Redirects from old Tilda URLs will be added here (stage 3.8).
  async redirects() {
    return [
      // Legacy/utility pages from Tilda export
      { source: "/fail", destination: "/", permanent: true },
      { source: "/page35905553", destination: "/", permanent: true },
      { source: "/page35906216", destination: "/", permanent: true },

      // Legacy sections/pages → homepage anchors
      { source: "/contact", destination: "/#contacts", permanent: true },
      { source: "/kontakty", destination: "/#contacts", permanent: true },
      { source: "/otzyvy", destination: "/#reviews", permanent: true },
      { source: "/portfolio", destination: "/#cases", permanent: true },
      { source: "/price", destination: "/#cta", permanent: true },
      { source: "/uslugi", destination: "/#services", permanent: true },
    ];
  },
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;

