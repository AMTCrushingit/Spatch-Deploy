import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // No middleware, no rewrites, no domain restrictions
  // Fully static — works on any domain including rivva.vercel.app
};

export default nextConfig;