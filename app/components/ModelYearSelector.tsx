'use client';

interface Props {
  selectedYear: string;
  setSelectedYear: (year: string) => void;
}

export default function ModelYearSelector({ selectedYear, setSelectedYear }: Props) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2014 }, (_, i) => currentYear - i);

  return (
    <div>
      <label htmlFor="year-select" className="block text-sm font-medium text-foreground mb-2">
        Model Year
      </label>
      <select
        id="year-select"
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
      >
        <option value="">Select a year</option>
        {years.map((year) => (
          <option key={year} value={year.toString()}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}
