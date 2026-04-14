/** @type {import('next').NextConfig} */
const nextConfig = {
  // Essential for static exports:
  output: 'export',
  
  // Your existing configuration:
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true, 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Optional but recommended:
  trailingSlash: true, // Helps with static file routing
  devIndicators: false,
};

module.exports = nextConfig;
