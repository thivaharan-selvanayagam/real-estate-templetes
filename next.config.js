/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // 👈 Tells Next.js to load images directly from the source CDN instead of proxying them
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.repliers.io' },
      { protocol: 'https', hostname: 'images.repliers.io' },
      { protocol: 'https', hostname: '**.repliers.io' },
      { protocol: 'https', hostname: 'cdn.realtor.ca' },
      { protocol: 'https', hostname: '**.cloudfront.net' },
    ],
  },
};

module.exports = nextConfig;