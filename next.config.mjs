/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove the i18n config since we're using dynamic routes
  // The [locale] folder handles internationalization

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
