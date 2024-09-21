'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import VehicleMakeSelector from './components/VehicleMakeSelector';
import ModelYearSelector from './components/ModelYearSelector';
import Footer from './components/Footer';

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
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-grow flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md bg-card-bg p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-8 text-center text-primary">Car Dealer App</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
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
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!selectedMake || !selectedYear}
            >
              Find Models
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
