import { FileDown, Mail } from "lucide-react";
import type { Profile as ProfileData } from "@/types/resume";

interface ProfileProps {
  profile: ProfileData;
}

// 프로필: 이름, 한 줄 소개, 소개 목록, 이메일
export function Profile({ profile }: ProfileProps) {
  return (
    <header className="border-b pb-8">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {profile.name}
        <span className="ml-3 text-lg font-normal text-muted-foreground">
          {profile.nameEn}
        </span>
      </h1>
      <p className="mt-3 text-lg font-medium leading-snug">{profile.headline}</p>
      <ul className="mt-5 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
        {profile.intro.map((text) => (
          <li key={text} className="flex gap-2">
            <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground" />
            <span>{text}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium">
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 hover:text-primary hover:underline"
        >
          <Mail className="size-4" aria-hidden />
          {profile.email}
        </a>
        {/* 상대 경로: basePath 배포 시에도 루트 페이지에서 동작 */}
        <a
          href="resume.pdf"
          download="황지환_이력서.pdf"
          className="inline-flex items-center gap-2 text-primary hover:underline print:hidden"
        >
          <FileDown className="size-4" aria-hidden />
          PDF 다운로드
        </a>
      </div>
    </header>
  );
}
