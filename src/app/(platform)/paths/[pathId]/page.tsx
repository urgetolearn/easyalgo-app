import { PathDetailView } from "@/components/paths/path-detail-view";
import { getPathById } from "@/data/paths";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = { params: Promise<{ pathId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pathId } = await params;
  const path = getPathById(pathId);
  return { title: path ? `${path.title} path · EasyAlgo` : "Path · EasyAlgo" };
}

export default async function PathDetailPage({ params }: Props) {
  const { pathId } = await params;
  const path = getPathById(pathId);
  if (!path) notFound();
  return <PathDetailView path={path} />;
}
