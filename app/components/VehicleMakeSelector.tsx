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
    return <div>Loading vehicle makes...</div>;
  }

  return (
    <div>
      <label htmlFor="make-select" className="block text-sm font-medium text-foreground mb-2">
        Select a vehicle make
      </label>
      <select
        id="make-select"
        className="input"
        value={selectedMake}
        onChange={(e) => setSelectedMake(e.target.value)}
      >
        <option value="">All makes</option>
        {makes.map((make, index) => (
          <option key={`${make.MakeId}-${index}`} value={make.MakeId.toString()}>
            {make.MakeName}
          </option>
        ))}
      </select>
    </div>
  );
}