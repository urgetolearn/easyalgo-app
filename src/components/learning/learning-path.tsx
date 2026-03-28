import { Card } from "@/components/ui/card";
import type { LearningTopic } from "@/types/dsa";

interface LearningPathProps {
  topics: LearningTopic[];
  selectedId: string;
  completedIds: string[];
  onSelect: (id: string) => void;
}

export function LearningPath({
  topics,
  selectedId,
  completedIds,
  onSelect,
}: LearningPathProps) {
  return (
    <Card className="space-y-3">
      <h2 className="text-sm font-semibold tracking-wide text-[var(--muted)]">
        Classic track
      </h2>
      <div className="space-y-2">
        {topics
          .sort((a, b) => a.order - b.order)
          .map((topic) => {
            const isActive = topic.id === selectedId;
            const completed = completedIds.includes(topic.id);
            return (
              <button
                type="button"
                key={topic.id}
                onClick={() => onSelect(topic.id)}
                className={`w-full rounded-lg border p-3 text-left transition ${
                  isActive
                    ? "border-[var(--accent)] bg-[#152030]"
                    : "hover:bg-[#161e2b]"
                }`}
              >
                <p className="text-sm font-medium">{`${topic.order}. ${topic.title}`}</p>
                <p className="text-xs text-[var(--muted)]">{topic.description}</p>
                <p className="mt-2 text-xs">
                  {completed ? (
                    <span className="text-[var(--success)]">Completed</span>
                  ) : (
                    <span className="text-[var(--muted)]">In progress</span>
                  )}
                </p>
              </button>
            );
          })}
      </div>
    </Card>
  );
}
