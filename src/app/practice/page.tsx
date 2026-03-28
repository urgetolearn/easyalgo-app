import { EasyAlgoApp } from "@/components/app/easyalgo-app";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Classic practice · EasyAlgo",
};

export default function PracticePage() {
  return <EasyAlgoApp />;
}
