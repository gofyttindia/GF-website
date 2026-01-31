/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Mark mongodb as external - it's optional and only used when MONGODB_URI is configured
  serverExternalPackages: ['mongodb'],
  // Enable Turbopack (default in Next.js 16) - empty config silences webpack migration warning
  turbopack: {},
}

export default nextConfig
