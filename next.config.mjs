/** @type {import('next').NextConfig} */
const nextConfig = {
  // Produces a fully static site in ./out on `next build`.
  output: "export",
  // next/image optimization requires a server; disable for static export.
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
