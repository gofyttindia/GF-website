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
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Mark mongodb as external to prevent bundling errors when not installed
      config.externals = config.externals || []
      config.externals.push('mongodb')
    }
    return config
  },
}

export default nextConfig
