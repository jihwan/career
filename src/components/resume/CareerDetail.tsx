import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Career } from "@/types/resume";
import { SectionTitle } from "./SectionTitle";

interface CareerDetailProps {
  careers: Career[];
}

// 기본으로 펼쳐 두는 최근 경력 개수
const openCount = 3;

// 항목 목록 공통 렌더링
function ListItems({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5 text-sm leading-relaxed">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

// 소제목 라벨
function SubLabel({ children }: { children: string }) {
  return (
    <h4 className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground">
      {children}
    </h4>
  );
}

// 경력 상세: 회사별 성과, 역할, 기술 스택, 핵심 프로젝트
export function CareerDetail({ careers }: CareerDetailProps) {
  return (
    <section aria-labelledby="career-detail">
      <SectionTitle id="career-detail">경력 상세</SectionTitle>
      <div className="space-y-5">
        {careers.map((career, index) => (
          <Card key={`${career.company}-${career.period}`} className="py-0">
            {/* 최근 경력은 펼침, 오래된 경력은 접힘 (인쇄 시 모두 펼침) */}
            <details open={index < openCount} className="group/details">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 [&::-webkit-details-marker]:hidden">
                <div>
                  <CardTitle className="text-lg">{career.company}</CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {career.rank} · {career.period} ({career.duration})
                  </p>
                </div>
                <ChevronDown
                  aria-hidden
                  className="size-4 shrink-0 text-muted-foreground transition-transform group-open/details:rotate-180 print:hidden"
                />
              </summary>
              <CardContent className="space-y-5 pb-4">
              <div>
                <SubLabel>성과</SubLabel>
                <ListItems items={career.achievements} />
              </div>
              <div>
                <SubLabel>역할</SubLabel>
                <ListItems items={career.roles} />
              </div>
              <div>
                <SubLabel>기술</SubLabel>
                <dl className="grid gap-x-4 gap-y-1.5 text-sm sm:grid-cols-[6rem_1fr]">
                  {career.tech.map((item) => (
                    <div key={item.label} className="contents">
                      <dt className="text-muted-foreground">{item.label}</dt>
                      <dd>{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              {career.projects.length > 0 && (
                <div>
                  <SubLabel>핵심 프로젝트</SubLabel>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>프로젝트</TableHead>
                        <TableHead>기간</TableHead>
                        <TableHead>역할</TableHead>
                        <TableHead>기술</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {career.projects.map((project) => (
                        <TableRow key={project.name}>
                          <TableCell className="font-medium whitespace-normal">
                            {project.name}
                          </TableCell>
                          <TableCell className="whitespace-normal">{project.period}</TableCell>
                          <TableCell className="whitespace-normal">{project.role}</TableCell>
                          <TableCell className="whitespace-normal">
                            <span className="flex flex-wrap gap-1">
                              {project.tech.split(", ").map((tech) => (
                                <Badge key={tech} variant="secondary">
                                  {tech}
                                </Badge>
                              ))}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
              </CardContent>
            </details>
          </Card>
        ))}
      </div>
    </section>
  );
}
