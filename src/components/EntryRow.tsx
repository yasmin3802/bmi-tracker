// src/components/EntryRow.tsx
import type { Entry } from "../types";
import { bmiCategory, categoryColor } from "../lib/bmi";

type EntryRowProps = {
  entry: Entry;
  onDelete: (id: string) => void;
};

export function EntryRow({ entry, onDelete }: EntryRowProps) {
  const date = new Date(entry.createdAt).toLocaleDateString();
  const category = bmiCategory(entry.bmi);

  return (
    <li className="flex items-center justify-between py-4">
      <div>
        <p className="font-medium">
          {entry.bmi.toFixed(1)}{" "}
          <span className={`text-sm ${categoryColor[category]}`}>{category}</span>
        </p>
        <p className="text-xs text-zinc-500">
          {entry.weightKg} kg · {entry.heightCm} cm · {date}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onDelete(entry.id)}
        aria-label={`Delete entry from ${date}`}
        className="rounded-md px-2 py-1 text-sm text-red-400 hover:bg-red-400/10"
      >
        Delete
      </button>
    </li>
  );
}