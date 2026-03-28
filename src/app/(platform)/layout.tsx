import { AppShell } from "@/components/layout/app-shell";
import { LearningProgressProvider } from "@/state/learning-progress-store";

export default function PlatformLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <LearningProgressProvider>
      <AppShell>{children}</AppShell>
    </LearningProgressProvider>
  );
}
