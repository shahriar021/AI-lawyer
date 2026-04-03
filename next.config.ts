/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["pdf-parse"], // Next.js 15+
  // For Next.js 13/14, use:
  // experimental: { serverComponentsExternalPackages: ["pdf-parse"] }
};

export default nextConfig;
