import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // ISR revalidation is set per-page; archive pages are static,
  // the daily drop page revalidates on a short interval.
  outputFileTracingRoot: path.join(__dirname),

  // Add styles/ to the SASS load path so module files can write
  // @use "variables" instead of @use "@/styles/variables"
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

export default nextConfig;
