// src/components/BmiForm.tsx
import { useState } from "react";
import type { FormEvent } from "react";
import { calculateBmi, bmiCategory, categoryColor } from "../lib/bmi";

type BmiFormProps = {
  onSave: (heightCm: number, weightKg: number) => void;
};

export function BmiForm({ onSave }: BmiFormProps) {
  // Raw strings: this is what the inputs show
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");

  // Derived values: computed during render, NOT stored in state
  const height = Number(heightCm);
  const weight = Number(weightKg);
  const bmi = height > 0 && weight > 0 ? calculateBmi(height, weight) : null;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (bmi === null) return;
    onSave(height, weight);
    setHeightCm("");
    setWeightKg("");
  }

  const inputClass =
    "mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6"
    >
      <h2 className="text-xl font-semibold">Calculate your BMI</h2>

      <label className="block">
        <span className="text-sm font-medium text-zinc-300">Height (cm)</span>
        <input
          type="number"
          inputMode="decimal"
          min={50}
          max={250}
          value={heightCm}
          onChange={(e) => setHeightCm(e.target.value)}
          placeholder="e.g. 175"
          className={inputClass}
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-zinc-300">Weight (kg)</span>
        <input
          type="number"
          inputMode="decimal"
          min={20}
          max={300}
          value={weightKg}
          onChange={(e) => setWeightKg(e.target.value)}
          placeholder="e.g. 70"
          className={inputClass}
        />
      </label>

      {bmi !== null && (
        <p aria-live="polite" className="text-lg">
          Your BMI is <strong>{bmi.toFixed(1)}</strong> {" "}
          <span className={`font-medium ${categoryColor[bmiCategory(bmi)]}`}>
            {bmiCategory(bmi)}
          </span>
        </p>
      )}

      <button
        type="submit"
        disabled={bmi === null}
        className="rounded-lg bg-violet-600 px-4 py-2 font-medium text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Save entry
      </button>
    </form>
  );
}