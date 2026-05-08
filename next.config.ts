import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Redirects from old Tilda URLs will be added here (stage 3.8).
  async redirects() {
    return [
      // Legacy/utility pages from Tilda export
      { source: "/fail", destination: "/", permanent: true },
      { source: "/page35905553", destination: "/", permanent: true },
      { source: "/page35906216", destination: "/", permanent: true },

      // Legacy pages
      { source: "/kontakty", destination: "/contact", permanent: true },
      { source: "/otzyvy", destination: "/#reviews", permanent: true },
      { source: "/portfolio", destination: "/#cases", permanent: true },
      { source: "/price", destination: "/#cta", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      // Current production domain
      { protocol: "https", hostname: "demontagmsk.ru" },
      { protocol: "https", hostname: "www.demontagmsk.ru" },

      // Typical Tilda CDNs (for migrated images/icons)
      { protocol: "https", hostname: "static.tildacdn.com" },
      { protocol: "https", hostname: "tildacdn.com" },
      { protocol: "https", hostname: "optim.tildacdn.com" },
      { protocol: "https", hostname: "thb.tildacdn.com" },
    ],
  },
};

export default nextConfig;
