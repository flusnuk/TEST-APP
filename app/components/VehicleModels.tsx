'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { use } from 'react';

interface VehicleModel {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

interface VehicleModelResponse {
  Results: VehicleModel[];
}

async function fetchVehicleModels(makeId: string, year: string): Promise<VehicleModel[]> {
  const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data: VehicleModelResponse = await response.json();
  if (!data.Results || data.Results.length === 0) {
    throw new Error('No models found for the selected make and year.');
  }
  return data.Results;
}

function ModelList({ makeId, year }: { makeId: string; year: string }) {
  const models = use(fetchVehicleModels(makeId, year));

  return (
    <div className="w-full max-w-6xl mx-auto p-8 bg-background">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-primary">Models for {models[0]?.Make_Name} in {year}</h2>
        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {models.map((model) => (
          <div key={model.Model_ID} className="card hover:bg-card-hover">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-primary">{model.Model_Name}</h3>
              <p className="text-foreground">Make: {model.Make_Name}</p>
              <p className="text-foreground">Model ID: {model.Model_ID}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function VehicleModels({ makeId, year }: { makeId: string; year: string }) {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>}>
      <ModelList makeId={makeId} year={year} />
    </Suspense>
  );
}
