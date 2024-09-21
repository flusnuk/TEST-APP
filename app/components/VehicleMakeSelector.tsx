'use client';

import { useState, useEffect } from 'react';

interface Make {
    MakeId: number;
    MakeName: string;
    VehicleTypeId: number,
    VehicleTypeName: string
}

interface Props {
  selectedMake: string;
  setSelectedMake: (make: string) => void;
}

export default function VehicleMakeSelector({ selectedMake, setSelectedMake }: Props) {
  const [makes, setMakes] = useState<Make[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json')
      .then(response => response.json())
      .then(data => {
        setMakes(data.Results);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching vehicle makes:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="animate-pulse h-10 bg-gray-200 rounded"></div>;
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
        {makes.map((make, index) => (
          <option key={`${make.MakeId}-${index}`} value={make.MakeId.toString()}>
            {make.MakeName}
          </option>
        ))}
      </select>
    </div>
  );
}