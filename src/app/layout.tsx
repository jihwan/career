import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

// 한글 지원 본문 폰트
const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "황지환 | 이력서",
  description:
    "AI가 만든 코드까지 책임지는, 반도체·디스플레이 제조 시스템 직접 설계·구현 시니어 개발자 황지환의 이력서",
  openGraph: {
    title: "황지환 | 이력서",
    description:
      "AI가 만든 코드까지 책임지는, 반도체·디스플레이 제조 시스템 직접 설계·구현 시니어 개발자 황지환의 이력서",
    locale: "ko_KR",
    type: "profile",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
