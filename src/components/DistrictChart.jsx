import useMGNREGAData from "../hooks/useMGNREGAData";

export default function DistrictChart() {
  const { data, loading, error } = useMGNREGAData();

  if (loading) return <p className="text-gray-600">Loading district data...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        District Performance Data
      </h2>
      <div className="overflow-x-auto">
        <pre className="text-sm bg-gray-50 p-4 rounded-md">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
}
