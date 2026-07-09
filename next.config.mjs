/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // images: {
  //   formats: ["image/avif", "image/webp"],
  // },
  output: 'export',          // Generates static HTML/CSS/JS assets
  images: {
    unoptimized: true,       // Disables Vercel-dependent image optimization server
  },
};

export default nextConfig;
