const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
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
    // Static export has no server to run Next's image optimizer.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],      // Disables Vercel-dependent image optimization server
  },
};

export default nextConfig;
