import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // ISR revalidation is set per-page; archive pages are static,
  // the daily drop page revalidates on a short interval.
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
