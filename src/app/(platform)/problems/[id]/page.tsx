import { ProblemPageClient } from "@/components/pages/problem-page-client";
import { getProblemById } from "@/lib/problem-utils";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const p = getProblemById(id);
  return { title: p ? `${p.title} · EasyAlgo` : "Problem · EasyAlgo" };
}

export default async function ProblemPage({ params }: Props) {
  const { id } = await params;
  const problem = getProblemById(id);
  if (!problem) notFound();
  return <ProblemPageClient problem={problem} />;
}
