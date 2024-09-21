/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['vpic.nhtsa.dot.gov'],
  },
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
