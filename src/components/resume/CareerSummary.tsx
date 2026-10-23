import type { Career } from "@/types/resume";
import { SectionTitle } from "./SectionTitle";

interface CareerSummaryProps {
  careers: Career[];
}

// 경력 요약: 회사, 직급/직책, 기간, 주요 역할을 한눈에 보는 표 (모바일은 카드형)
export function CareerSummary({ careers }: CareerSummaryProps) {
  const gridClass = "md:grid md:grid-cols-[9rem_11rem_13rem_1fr] md:gap-x-4";

  return (
    <section aria-labelledby="career-summary">
      <SectionTitle id="career-summary">경력 요약</SectionTitle>
      <div className="overflow-hidden rounded-xl ring-1 ring-foreground/10">
        <div
          className={`hidden bg-muted px-4 py-2.5 text-xs font-semibold text-muted-foreground ${gridClass}`}
        >
          <span>회사</span>
          <span>직급 / 직책</span>
          <span>기간</span>
          <span>주요 역할</span>
        </div>
        <ul className="divide-y">
          {careers.map((career) => (
            <li
              key={`${career.company}-${career.period}`}
              className={`space-y-1 px-4 py-3 text-sm md:items-start md:space-y-0 ${gridClass}`}
            >
              <span className="block font-semibold">{career.company}</span>
              <span className="block">{career.rank}</span>
              <span className="block text-muted-foreground">
                {career.period}
                <span className="ml-1 text-xs">({career.duration})</span>
              </span>
              <span className="block leading-relaxed">{career.summary}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
