const nextConfig = {
  // Essential for static exports:
  output: 'export', // ← Add this line (most important fix)
  
  // Your existing configuration:
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true, // ← This is correct for static exports
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
};

export default nextConfig;