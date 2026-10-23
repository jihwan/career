import resumeData from "@/data/resume.json";
import type { Resume } from "@/types/resume";

// 이력서 JSON 데이터를 타입과 함께 반환
export function getResume(): Resume {
  return resumeData as Resume;
}
