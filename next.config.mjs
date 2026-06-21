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
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
}

export default nextConfig
