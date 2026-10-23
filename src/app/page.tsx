import { CareerDetail } from "@/components/resume/CareerDetail";
import { CareerSummary } from "@/components/resume/CareerSummary";
import { Education } from "@/components/resume/Education";
import { Profile } from "@/components/resume/Profile";
import { SectionNav } from "@/components/resume/SectionNav";
import { Skills } from "@/components/resume/Skills";
import { Strengths } from "@/components/resume/Strengths";
import { getResume } from "@/lib/getResume";

// 이력서 메인 페이지: JSON 데이터를 섹션 순서대로 조립
export default function Home() {
  const resume = getResume();

  return (
    <>
      <SectionNav />
      <main className="mx-auto w-full max-w-4xl space-y-12 px-4 py-10 sm:px-6 sm:py-14">
        <Profile profile={resume.profile} />
        <CareerSummary careers={resume.careers} />
        <Strengths strengths={resume.strengths} />
        <CareerDetail careers={resume.careers} />
        <Skills skills={resume.skills} tools={resume.tools} />
        <Education
          education={resume.education}
          trainings={resume.trainings}
          certificates={resume.certificates}
        />
      </main>
    </>
  );
}
