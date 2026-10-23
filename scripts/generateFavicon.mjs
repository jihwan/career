// src/app/icon.svg를 PNG로 렌더링하여 favicon.ico, apple-icon.png 생성
import { execFile } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { findChromePath } from "./findChromePath.mjs";

const rootDir = resolve(import.meta.dirname, "..");
const appDir = join(rootDir, "src", "app");
const svgPath = join(appDir, "icon.svg");
const icoSizes = [16, 32, 48];
const appleSize = 180;

// 헤드리스 Chrome의 canvas로 SVG를 크기별 PNG(base64)로 렌더링
function renderPngs(chromePath, svgText, sizes) {
  const tempDir = mkdtempSync(join(tmpdir(), "favicon-"));
  const htmlPath = join(tempDir, "render.html");
  const svgBase64 = Buffer.from(svgText).toString("base64");
  const html = `<!doctype html><body><pre id="out"></pre><script>
    const sizes = ${JSON.stringify(sizes)};
    const img = new Image();
    img.onload = () => {
      const result = {};
      for (const size of sizes) {
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = size;
        canvas.getContext("2d").drawImage(img, 0, 0, size, size);
        result[size] = canvas.toDataURL("image/png").split(",")[1];
      }
      document.getElementById("out").textContent = JSON.stringify(result);
    };
    img.src = "data:image/svg+xml;base64,${svgBase64}";
  </script></body>`;
  writeFileSync(htmlPath, html);

  return new Promise((resolveRender, rejectRender) => {
    execFile(
      chromePath,
      [
        "--headless=new",
        "--disable-gpu",
        "--dump-dom",
        "--virtual-time-budget=5000",
        `file:///${htmlPath.replaceAll("\\", "/")}`,
      ],
      { timeout: 60000, maxBuffer: 50 * 1024 * 1024 },
      (error, stdout) => {
        rmSync(tempDir, { recursive: true, force: true });
        if (error) {
          rejectRender(error);
          return;
        }
        const match = stdout.match(/<pre id="out">([\s\S]*?)<\/pre>/);
        if (!match || !match[1].trim()) {
          rejectRender(new Error("PNG 렌더링 결과를 찾을 수 없습니다."));
          return;
        }
        // DOM 직렬화 시 따옴표가 이스케이프되지 않으므로 그대로 파싱
        const decoded = JSON.parse(match[1].replaceAll("&quot;", '"'));
        resolveRender(
          Object.fromEntries(
            Object.entries(decoded).map(([size, base64]) => [size, Buffer.from(base64, "base64")])
          )
        );
      }
    );
  });
}

// PNG를 임베드한 ICO 파일 생성
function buildIco(entries) {
  const headerSize = 6 + entries.length * 16;
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(entries.length, 4);

  let offset = headerSize;
  entries.forEach(({ size, png }, index) => {
    const pos = 6 + index * 16;
    header.writeUInt8(size >= 256 ? 0 : size, pos); // width
    header.writeUInt8(size >= 256 ? 0 : size, pos + 1); // height
    header.writeUInt8(0, pos + 2); // palette
    header.writeUInt8(0, pos + 3); // reserved
    header.writeUInt16LE(1, pos + 4); // color planes
    header.writeUInt16LE(32, pos + 6); // bits per pixel
    header.writeUInt32LE(png.length, pos + 8);
    header.writeUInt32LE(offset, pos + 12);
    offset += png.length;
  });
  return Buffer.concat([header, ...entries.map(({ png }) => png)]);
}

async function main() {
  const svgText = readFileSync(svgPath, "utf8");
  const pngs = await renderPngs(findChromePath(), svgText, [...icoSizes, appleSize]);

  const ico = buildIco(icoSizes.map((size) => ({ size, png: pngs[size] })));
  writeFileSync(join(appDir, "favicon.ico"), ico);
  writeFileSync(join(appDir, "apple-icon.png"), pngs[appleSize]);
  console.log(`favicon.ico(${ico.length} bytes), apple-icon.png(${pngs[appleSize].length} bytes) 생성 완료`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
