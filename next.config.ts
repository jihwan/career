import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages 배포를 위한 정적 export (basePath는 배포 단계에서 추가)
  output: "export",
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
