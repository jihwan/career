import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SkillGroup } from "@/types/resume";
import { SectionTitle } from "./SectionTitle";

interface SkillsProps {
  skills: SkillGroup[];
  tools: SkillGroup[];
}

// 기술 그룹 카드 (설명형 또는 라벨/값 목록형)
function SkillCard({ group }: { group: SkillGroup }) {
  return (
    <Card size="sm" className="break-inside-avoid">
      <CardHeader>
        <CardTitle>{group.title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm leading-relaxed">
        {group.description && <p>{group.description}</p>}
        {group.items && (
          <dl className="space-y-1">
            {group.items.map((item) => (
              <div key={item.label} className="flex gap-3">
                <dt className="w-16 shrink-0 text-muted-foreground">{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </CardContent>
    </Card>
  );
}

// 기술 및 도구 섹션
export function Skills({ skills, tools }: SkillsProps) {
  return (
    <section aria-labelledby="skills">
      <SectionTitle id="skills">기술 / 도구</SectionTitle>
      <div className="grid gap-4 sm:grid-cols-2">
        {[...skills, ...tools].map((group) => (
          <SkillCard key={group.title} group={group} />
        ))}
      </div>
    </section>
  );
}
