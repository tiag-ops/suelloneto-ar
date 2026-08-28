import type { NextConfig } from "next";

// Static export: requerido para Cloudflare Pages (sin server).
// Ver https://nextjs.org/docs/app/building-your-application/deploying/static-exports
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
