'use client';

interface Props {
  selectedYear: string;
  setSelectedYear: (year: string) => void;
}

export default function ModelYearSelector({ selectedYear, setSelectedYear }: Props) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2014 }, (_, i) => currentYear - i);

  return (
    <select
      className="w-full p-2 border border-gray-300 rounded"
      value={selectedYear}
      onChange={(e) => setSelectedYear(e.target.value)}
    >
      <option value="">Select a model year</option>
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
}
