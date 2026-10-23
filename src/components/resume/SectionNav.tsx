// 상단 고정 앵커 내비게이션 (섹션 id는 SectionTitle과 동일)
const navItems = [
  { id: "career-summary", label: "경력 요약" },
  { id: "strengths", label: "핵심 역량" },
  { id: "career-detail", label: "경력 상세" },
  { id: "skills", label: "기술 / 도구" },
  { id: "education", label: "학력 / 자격" },
];

export function SectionNav() {
  return (
    <nav
      aria-label="섹션 이동"
      className="sticky top-0 z-10 border-b bg-background/90 backdrop-blur print:hidden"
    >
      <ul className="mx-auto flex max-w-4xl gap-1 overflow-x-auto px-4 py-2 text-sm sm:px-6">
        {navItems.map((item) => (
          <li key={item.id} className="shrink-0">
            <a
              href={`#${item.id}`}
              className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
