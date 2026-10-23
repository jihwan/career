// 설치된 Chrome/Edge 실행 파일 경로 탐색 (CHROME_PATH 환경변수 우선)
import { existsSync } from "node:fs";

export function findChromePath() {
  const candidates = [
    process.env.CHROME_PATH,
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  ].filter(Boolean);
  const found = candidates.find((path) => existsSync(path));
  if (!found) {
    throw new Error(
      "Chrome/Edge를 찾을 수 없습니다. CHROME_PATH 환경변수에 실행 파일 경로를 지정하세요."
    );
  }
  return found;
}
