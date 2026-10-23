import { Award, ExternalLink, GraduationCap } from "lucide-react";
import type {
  Certificate,
  Education as EducationData,
  Training,
  TrainingLink,
} from "@/types/resume";
import { SectionTitle } from "./SectionTitle";

interface EducationProps {
  education: EducationData[];
  trainings: Training[];
  trainingLinks: TrainingLink[];
  certificates: Certificate[];
}

// 학력, 이수/교육, 자격증 섹션
export function Education({ education, trainings, trainingLinks, certificates }: EducationProps) {
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
        {/* 교육훈련 이력 증빙: 새 탭에서 열기 (noopener로 opener 접근 차단) */}
        {trainingLinks.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium break-inside-avoid">
            {trainingLinks.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-primary hover:underline"
                >
                  {link.label}
                  <ExternalLink className="size-3.5" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
