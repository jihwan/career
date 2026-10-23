// 정적 export 결과(out/)를 헤드리스 Chrome으로 인쇄하여 public/resume.pdf 생성
import { execFile } from "node:child_process";
import { copyFileSync, existsSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";
import { findChromePath } from "./findChromePath.mjs";

const rootDir = resolve(import.meta.dirname, "..");
const outDir = join(rootDir, "out");
// PDF_OUT 환경변수로 출력 경로 변경 가능 (기본: public/resume.pdf)
const pdfPath = process.env.PDF_OUT ?? join(rootDir, "public", "resume.pdf");
// next.config.ts의 basePath 기본값과 동일하게 유지할 것
const basePath = process.env.BASE_PATH ?? "/career";

// 확장자별 MIME 타입
const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
};

// out/ 디렉터리를 임시 포트로 정적 서빙
function startStaticServer() {
  const server = createServer((req, res) => {
    const rawPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    // basePath 접두사를 제거하여 out/ 내 실제 경로로 매핑
    const urlPath = rawPath.startsWith(basePath) ? rawPath.slice(basePath.length) || "/" : rawPath;
    let filePath = normalize(join(outDir, urlPath));
    // out/ 바깥 경로 접근 차단
    if (!filePath.startsWith(outDir)) {
      res.writeHead(403).end();
      return;
    }
    if (existsSync(filePath) && statSync(filePath).isDirectory()) {
      filePath = join(filePath, "index.html");
    }
    if (!existsSync(filePath)) {
      res.writeHead(404).end();
      return;
    }
    res.writeHead(200, {
      "Content-Type": mimeTypes[extname(filePath)] ?? "application/octet-stream",
    });
    res.end(readFileSync(filePath));
  });
  return new Promise((resolveServer) => {
    server.listen(0, "127.0.0.1", () => resolveServer(server));
  });
}

// Chrome으로 페이지를 인쇄하여 PDF 저장
// 동기 실행 시 같은 프로세스의 정적 서버가 응답하지 못해 교착되므로 비동기로 실행
function printPdf(chromePath, url) {
  return new Promise((resolvePrint, rejectPrint) => {
    execFile(
      chromePath,
      [
        "--headless=new",
        "--disable-gpu",
        "--no-pdf-header-footer",
        "--virtual-time-budget=8000",
        `--print-to-pdf=${pdfPath}`,
        url,
      ],
      { timeout: 60000 },
      (error) => (error ? rejectPrint(error) : resolvePrint())
    );
  });
}

async function main() {
  if (!existsSync(join(outDir, "index.html"))) {
    throw new Error("out/index.html이 없습니다. 먼저 next build를 실행하세요.");
  }
  const chromePath = findChromePath();
  const server = await startStaticServer();
  try {
    const { port } = server.address();
    await printPdf(chromePath, `http://127.0.0.1:${port}${basePath}/`);
  } finally {
    server.close();
  }
  // 정적 export 결과물에도 최신 PDF 포함 (기본 출력 경로일 때만)
  if (!process.env.PDF_OUT) {
    copyFileSync(pdfPath, join(outDir, "resume.pdf"));
  }
  console.log(`PDF 생성 완료: ${pdfPath} (${statSync(pdfPath).size} bytes)`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
