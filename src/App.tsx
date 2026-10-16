import { BmiForm } from "./components/BmiForm";

export default function App() {
  function addEntry(heightCm: number, weightKg: number) {
    console.log("save", { heightCm, weightKg });
  }

  return (
    <main className="mx-auto max-w-xl space-y-10 p-6">
      <h1 className="text-3xl font-bold text-violet-400">BMI Tracker</h1>
      <BmiForm onSave={addEntry} />
    </main>
  );
}