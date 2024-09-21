import VehicleModels from '../../../components/VehicleModels';
import { Suspense } from 'react';

export async function generateStaticParams() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2014 }, (_, i) => (currentYear - i).toString());
  
  const makeResponse = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json');
    const makeData = await makeResponse.json();
    const makes = makeData.Results.map((make: { MakeId: string }) => make.MakeId);

    const params: { makeId: string; year: string }[] = [];
    for (const makeId of makes) {
      for (const year of years) {
      params.push({ makeId, year });
    }
  }

  return params;
}

const Page = ({ params }: { params: { makeid: string; year: string } }) => {
  const { makeid, year } = params;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VehicleModels makeId={makeid} year={year} />
    </Suspense>
  );
};

export default Page;
