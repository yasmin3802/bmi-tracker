// src/lib/bmi.ts
export function calculateBmi(heightCm: number, weightKg: number): number {
  const metres = heightCm / 100;
  return weightKg / (metres * metres);
}

export type BmiCategory = "Underweight" | "Healthy range" | "Overweight" | "Obese";

export function bmiCategory(bmi: number): BmiCategory {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Healthy range";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

// Used for colored badges (portfolio polish)
export const categoryColor: Record<BmiCategory, string> = {
  Underweight: "text-sky-400",
  "Healthy range": "text-emerald-400",
  Overweight: "text-amber-400",
  Obese: "text-red-400",
};