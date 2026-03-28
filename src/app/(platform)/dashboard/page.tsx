import { PlatformDashboard } from "@/components/dashboard/platform-dashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard · EasyAlgo",
  description: "Progress, recent problems, and continue learning.",
};

export default function DashboardPage() {
  return <PlatformDashboard />;
}
