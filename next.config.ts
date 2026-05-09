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

      // Legacy catalog/service URLs (without /uslugi prefix on old site)
      { source: "/demontazh-doma", destination: "/uslugi/demontazh-doma", permanent: true },
      {
        source: "/demontazh-konstrukczij",
        destination: "/uslugi/demontazh-konstrukciy",
        permanent: true,
      },
      {
        source: "/vyvoz-stroitelnogo-musora",
        destination: "/uslugi/vyvoz-musora-posle-demontazha",
        permanent: true,
      },

      // Legacy “works/portfolio” variations
      { source: "/nashi-raboty", destination: "/#cases", permanent: true },
      {
        source: "/nashi-raboty/demontazh-betona",
        destination: "/uslugi/demontaj-betona",
        permanent: true,
      },

      // Legacy single page
      {
        source: "/snos-avariynogo-zdaniya",
        destination: "/uslugi/demontazh-avariynykh-domov",
        permanent: true,
      },

      // Non-canonical /uslugi/* pages present in export → consolidate to /uslugi
      { source: "/uslugi/demontaj-domov-iz-penoblokov", destination: "/uslugi", permanent: true },
      { source: "/uslugi/demontaj-stariyfond", destination: "/uslugi", permanent: true },
      { source: "/uslugi/demontazh-avariynykh-domov", destination: "/uslugi", permanent: true },
      { source: "/uslugi/demontazh-ekskavatorom", destination: "/uslugi", permanent: true },
      { source: "/uslugi/demontazh-elektriki", destination: "/uslugi", permanent: true },
      { source: "/uslugi/demontazh-fundamenta-betona", destination: "/uslugi", permanent: true },
      { source: "/uslugi/demontazh-kirpichnyh-zdaniy", destination: "/uslugi", permanent: true },
      { source: "/uslugi/demontazh-obektov", destination: "/uslugi", permanent: true },
      {
        source: "/uslugi/demontazh-ograzhdayushhikh-konstrukczij-razbor-zabora",
        destination: "/uslugi",
        permanent: true,
      },
      { source: "/uslugi/demontazh-peregorodok", destination: "/uslugi", permanent: true },
      { source: "/uslugi/demontazh-plit-perekrytiya", destination: "/uslugi", permanent: true },
      {
        source: "/uslugi/demontazh-proizvodstvennogo-oborudovaniya",
        destination: "/uslugi",
        permanent: true,
      },
      {
        source: "/uslugi/demontazh-proizvodstvennykh-zdanij",
        destination: "/uslugi",
        permanent: true,
      },
      {
        source: "/uslugi/demontazh-razbor-starykh-postroek-sooruzhenij",
        destination: "/uslugi",
        permanent: true,
      },
      { source: "/uslugi/demontazh-sklada-snos-angara", destination: "/uslugi", permanent: true },
      { source: "/uslugi/demontazh-sudov-i-vagonov", destination: "/uslugi", permanent: true },
      { source: "/uslugi/demontazh-zavodov-i-cehov", destination: "/uslugi", permanent: true },
      { source: "/uslugi/rasshirenie-proemov", destination: "/uslugi", permanent: true },
      {
        source: "/uslugi/razborvoinskikhchastej-demontazhshakht",
        destination: "/uslugi",
        permanent: true,
      },
      { source: "/uslugi/snos-chastnyh-domov", destination: "/uslugi", permanent: true },
      { source: "/uslugi/snos-i-demontazhelevatora", destination: "/uslugi", permanent: true },
      { source: "/uslugi/snoskorovnikov-demontazhfermy", destination: "/uslugi", permanent: true },
      { source: "/uslugi/usilenie-proemov", destination: "/uslugi", permanent: true },

      // Important alias: exported page keeps text, but canonical is different slug
      {
        source: "/uslugi/demontazh-betonnykh-konstruktsij",
        destination: "/uslugi/demontazh-konstrukciy",
        permanent: true,
      },
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
