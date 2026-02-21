import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <section
      className={cn(
        "card-surface rounded-xl border border-solid p-4 shadow-[0_8px_30px_rgba(0,0,0,0.3)]",
        className
      )}
    >
      {children}
    </section>
  );
}
