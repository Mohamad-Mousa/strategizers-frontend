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
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "strategizers-backend.onrender.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.strategizers.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.strategizers-me.com",
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
