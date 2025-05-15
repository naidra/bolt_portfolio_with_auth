/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config, { dev, isServer }) => {
    // Disable webpack caching in development
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

module.exports = nextConfig;