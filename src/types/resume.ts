// 이력서 JSON 데이터 구조 정의

/** 라벨/값 쌍 (기술 스택, 연락처 등) */
export interface LabeledItem {
  label: string;
  value: string;
}

/** 프로필 */
export interface Profile {
  name: string;
  nameEn: string;
  headline: string;
  intro: string[];
  email: string;
}

/** 핵심 역량 */
export interface Strength {
  title: string;
  points: string[];
}

/** 경력 내 핵심 프로젝트 */
export interface Project {
  name: string;
  period: string;
  role: string;
  tech: string;
}

/** 경력 (회사 단위) */
export interface Career {
  company: string;
  rank: string;
  period: string;
  duration: string;
  // 경력 요약 표에 표시하는 한 줄 역할
  summary: string;
  achievements: string[];
  roles: string[];
  tech: LabeledItem[];
  projects: Project[];
}

/** 기술 분류 */
export interface SkillGroup {
  title: string;
  description?: string;
  items?: LabeledItem[];
}

/** 학력 */
export interface Education {
  major: string;
  graduated: string;
  school: string;
}

/** 교육 이수 */
export interface Training {
  institute: string;
  course: string;
}

/** 교육훈련 이력 증빙 링크 (새 탭에서 열림) */
export interface TrainingLink {
  label: string;
  url: string;
}

/** 자격증 */
export interface Certificate {
  name: string;
  acquired: string;
}

/** 이력서 전체 데이터 */
export interface Resume {
  profile: Profile;
  strengths: Strength[];
  careers: Career[];
  skills: SkillGroup[];
  tools: SkillGroup[];
  education: Education[];
  trainings: Training[];
  trainingLinks: TrainingLink[];
  certificates: Certificate[];
}
