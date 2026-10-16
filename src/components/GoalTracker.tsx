// src/components/GoalTracker.tsx
import { useState } from "react";
import type { Entry } from "../types";

type GoalTrackerProps = {
  latest: Entry | null; // most recent entry (current weight)
  first: Entry | null; // oldest entry (starting weight)
};

export function GoalTracker({ latest, first }: GoalTrackerProps) {
  // The ONLY state: the raw string from the input
  const [goalKg, setGoalKg] = useState("");

  // Everything below is derived during render
  const goal = Number(goalKg);
  const hasGoal = goal > 0;

  let diff: number | null = null;
  let progress = 0;

  if (hasGoal && latest && first) {
    diff = latest.weightKg - goal; // positive = still above goal
    const totalToTravel = first.weightKg - goal;
    if (totalToTravel === 0) {
      progress = diff === 0 ? 100 : 0;
    } else {
      progress = ((first.weightKg - latest.weightKg) / totalToTravel) * 100;
    }
    progress = Math.min(100, Math.max(0, progress)); // keep between 0 and 100
  }

  let message = "Save an entry to see your progress.";
  if (!hasGoal) {
    message = "Set a goal weight to start tracking.";
  } else if (diff !== null) {
    if (Math.abs(diff) < 0.05) message = "Goal reached! 🎉";
    else if (diff > 0) message = `${diff.toFixed(1)} kg to lose`;
    else message = `${Math.abs(diff).toFixed(1)} kg to gain`;
  }

  return (
    <section className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
      <h2 className="text-xl font-semibold">Goal tracker</h2>

      <label className="block">
        <span className="text-sm font-medium text-zinc-300">Goal weight (kg)</span>
        <input
          type="number"
          inputMode="decimal"
          min={20}
          max={300}
          value={goalKg}
          onChange={(e) => setGoalKg(e.target.value)}
          placeholder="e.g. 65"
          className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30"
        />
      </label>

      <p aria-live="polite" className="text-lg">
        {message}
      </p>

      {diff !== null && (
        <div>
          <div
            role="progressbar"
            aria-label="Progress toward goal weight"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
            className="h-3 w-full overflow-hidden rounded-full bg-zinc-800"
          >
            <div
              className="h-full rounded-full bg-violet-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-1 text-right text-xs text-zinc-500">{Math.round(progress)}%</p>
        </div>
      )}
    </section>
  );
}