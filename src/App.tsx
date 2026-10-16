// src/App.tsx
import { useState } from "react";
import type { Entry } from "./types";
import { calculateBmi } from "./lib/bmi";
import { BmiForm } from "./components/BmiForm";
import { EntryList } from "./components/EntryList";
import { GoalTracker } from "./components/GoalTracker";

export default function App() {
    // The saved entries live HERE because two siblings need them:
    // BmiForm creates them, EntryList displays them.
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
        <main className="mx-auto max-w-xl space-y-10 p-6">
            <h1 className="text-3xl font-bold text-violet-400">BMI Tracker</h1>
            <BmiForm onSave={addEntry} />
            <GoalTracker latest={latest} first={first} />
            <EntryList entries={entries} onDelete={removeEntry} />
        </main>
    );
}