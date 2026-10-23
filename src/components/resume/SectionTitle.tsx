import type { ReactNode } from "react";

interface SectionTitleProps {
  id: string;
  children: ReactNode;
}

// 섹션 공통 제목 (좌측 포인트 라인 + 제목)
export function SectionTitle({ id, children }: SectionTitleProps) {
  return (
    <h2
      id={id}
      className="mb-5 flex scroll-mt-16 items-center gap-3 text-xl font-bold tracking-tight"
    >
      <span aria-hidden className="h-6 w-1 rounded-full bg-primary" />
      {children}
    </h2>
  );
}
