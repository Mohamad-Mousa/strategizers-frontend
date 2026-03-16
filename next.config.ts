import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "localhost",
        port: "4000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.strategizers.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "api.strategizers.com",
        pathname: "/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
