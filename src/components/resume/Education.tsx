import { Award, GraduationCap } from "lucide-react";
import type { Certificate, Education as EducationData, Training } from "@/types/resume";
import { SectionTitle } from "./SectionTitle";

interface EducationProps {
  education: EducationData[];
  trainings: Training[];
  certificates: Certificate[];
}

// 학력, 이수/교육, 자격증 섹션
export function Education({ education, trainings, certificates }: EducationProps) {
  return (
    <section aria-labelledby="education" className="space-y-8">
      <div>
        <SectionTitle id="education">학력 / 자격</SectionTitle>
        <ul className="space-y-3 text-sm">
          {education.map((item) => (
            <li key={item.school} className="flex items-start gap-3">
              <GraduationCap className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
              <div>
                <p className="font-semibold">{item.school}</p>
                <p className="text-muted-foreground">
                  {item.major} · {item.graduated}
                </p>
              </div>
            </li>
          ))}
          {certificates.map((item) => (
            <li key={item.name} className="flex items-start gap-3">
              <Award className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-muted-foreground">{item.acquired}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold">이수 / 교육</h3>
        <ul className="space-y-1.5 text-sm">
          {trainings.map((item) => (
            <li key={item.course} className="flex gap-2">
              <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground" />
              <span>
                {item.institute && (
                  <span className="mr-2 text-muted-foreground">{item.institute}</span>
                )}
                {item.course}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
