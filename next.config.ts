import type { NextConfig } from "next";

// 프로젝트 페이지 배포용 basePath (저장소명과 동일). 개발 서버는 루트에서 동작
// scripts/generatePdf.mjs의 기본값과 동일하게 유지할 것
const basePath =
  process.env.BASE_PATH ?? (process.env.NODE_ENV === "production" ? "/career" : "");

const nextConfig: NextConfig = {
  // GitHub Pages 배포를 위한 정적 export
  output: "export",
  basePath,
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
