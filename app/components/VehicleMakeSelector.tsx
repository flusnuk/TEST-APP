'use client';

import { useState, useEffect } from 'react';

interface Make {
  MakeId: number;
  MakeName: string;
  VehicleTypeId: number;
  VehicleTypeName: string;
}

interface Props {
  selectedMake: string;
  setSelectedMake: (make: string) => void;
}

function useMakes() {
  const [makes, setMakes] = useState<Make[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMakes() {
      try {
        const response = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMakes(data.Results);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'An error occurred while fetching vehicle makes.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchMakes();
  }, []);

  return { makes, isLoading, error };
}

export default function VehicleMakeSelector({ selectedMake, setSelectedMake }: Props) {
  const { makes, isLoading, error } = useMakes();

  if (isLoading) {
    return <div className="animate-pulse h-10 bg-gray-200 rounded"></div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <label htmlFor="make-select" className="block text-sm font-medium text-foreground mb-2">
        Vehicle Make
      </label>
      <select
        id="make-select"
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        value={selectedMake}
        onChange={(e) => setSelectedMake(e.target.value)}
      >
        <option value="">Select a make</option>
        {makes.map((make) => (
          <option key={make.MakeId} value={make.MakeId.toString()}>
            {make.MakeName}
          </option>
        ))}
      </select>
    </div>
  );
}