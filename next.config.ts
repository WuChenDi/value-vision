import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  // output: 'export',
  images: {
    unoptimized: true,
    qualities: [50, 75, 100],
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'notes-wudi.pages.dev',
      },
    ],
  },
}

export default nextConfig
