/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["images.alphacoders.com"],
  },
};

module.exports = nextConfig;
