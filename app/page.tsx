'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import VehicleMakeSelector from './components/VehicleMakeSelector';
import ModelYearSelector from './components/ModelYearSelector';

export default function Home() {
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMake && selectedYear) {
      router.push(`/result/${selectedMake}/${selectedYear}`);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Car Dealer Application</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <VehicleMakeSelector
          selectedMake={selectedMake}
          setSelectedMake={setSelectedMake}
        />
        <ModelYearSelector
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!selectedMake || !selectedYear}
        >
          Next
        </button>
      </form>
    </main>
  );
}
