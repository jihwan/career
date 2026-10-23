import { Factory, Package, Sparkles, Users } from "lucide-react";
import type { ComponentType } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Strength } from "@/types/resume";
import { SectionTitle } from "./SectionTitle";

interface StrengthsProps {
  strengths: Strength[];
}

// 핵심 역량 제목별 아이콘 매핑
const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  "프로젝트 리더십": Users,
  "도메인 전문성": Factory,
  "제품 개발": Package,
  "AI/AX 전환": Sparkles,
};

// 핵심 역량 4개 카드
export function Strengths({ strengths }: StrengthsProps) {
  return (
    <section aria-labelledby="strengths">
      <SectionTitle id="strengths">핵심 역량</SectionTitle>
      <div className="grid gap-4 sm:grid-cols-2">
        {strengths.map((strength) => {
          const Icon = iconMap[strength.title] ?? Package;
          return (
            <Card key={strength.title}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Icon className="size-4 text-muted-foreground" />
                  {strength.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5 text-sm leading-relaxed">
                  {strength.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
