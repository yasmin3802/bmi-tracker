// src/components/EntryList.tsx
import type { Entry } from "../types";
import { EntryRow } from "./EntryRow";

type EntryListProps = {
  entries: Entry[];
  onDelete: (id: string) => void;
};

export function EntryList({ entries, onDelete }: EntryListProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold">History</h2>

      {entries.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-zinc-800 p-6 text-center text-zinc-400">
          No entries yet. Save your first BMI above.
        </p>
      ) : (
        <ul className="divide-y divide-zinc-800 rounded-2xl border border-zinc-800 bg-zinc-900/50 px-6">
          {entries.map((entry) => (
            <EntryRow key={entry.id} entry={entry} onDelete={onDelete} />
          ))}
        </ul>
      )}
    </section>
  );
}