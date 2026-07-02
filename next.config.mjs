/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Don't let lint warnings stop the production build on Vercel.
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Don't let type-check issues stop the production build on Vercel.
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
  compress: true,
}

export default nextConfig
