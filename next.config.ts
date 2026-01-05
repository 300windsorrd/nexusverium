import type { NextConfig } from "next";
import { basePath } from "./src/lib/paths";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath ? `${basePath}/` : "",
};

export default nextConfig;
