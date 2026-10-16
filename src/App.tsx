// src/App.tsx
import { useState } from "react";
import type { Entry } from "./types";
import { calculateBmi } from "./lib/bmi";
import { BmiForm } from "./components/BmiForm";
import { EntryList } from "./components/EntryList";
import { GoalTracker } from "./components/GoalTracker";

export default function App() {
  // The saved entries live HERE because several siblings need them:
  // BmiForm creates them, GoalTracker and EntryList read them.
  const [entries, setEntries] = useState<Entry[]>([]);

  function addEntry(heightCm: number, weightKg: number) {
    const entry: Entry = {
      id: crypto.randomUUID(),
      heightCm,
      weightKg,
      bmi: calculateBmi(heightCm, weightKg),
      createdAt: new Date().toISOString(),
    };
    setEntries((prev) => [entry, ...prev]); // new array, newest first
  }

  function removeEntry(id: string) {
    setEntries((prev) => prev.filter((e) => e.id !== id)); // new array, without that entry
  }

  const latest = entries[0] ?? null; // newest is first in the array
  const first = entries[entries.length - 1] ?? null; // oldest is last

  return (
    <main className="mx-auto max-w-xl space-y-8 px-6 py-12">
      <header className="space-y-2 text-center">
        <h1 className="bg-linear-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-4xl font-bold text-transparent">
          BMI Tracker
        </h1>
        <p className="text-zinc-400">
          Track your BMI and watch your progress toward your goal.
        </p>
      </header>

      <BmiForm onSave={addEntry} />
      <GoalTracker latest={latest} first={first} />
      <EntryList entries={entries} onDelete={removeEntry} />
    </main>
  );
}