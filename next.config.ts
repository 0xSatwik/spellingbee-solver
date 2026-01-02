import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Date format redirects (e.g., /answer-for-30-12-2025 -> /answer-for-december-30-2025)
  // are handled client-side in the /[slug] route because Next.js redirects
  // don't support dynamic pattern transformations (converting numbers to month names)
};

export default nextConfig;
