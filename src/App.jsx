import { StatCard } from "./components/StatCard";
import DistrictChart from "./components/DistrictChart";
import { Users, Calendar, TrendingUp } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-800">
            MGNREGA Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Rajasthan District Performance Overview
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <StatCard
            title="Total Employment Days"
            value="2.7M"
            icon={<Calendar className="text-blue-600" />}
            trend="+12% from last quarter"
          />
          <StatCard
            title="Active Workers"
            value="74,000"
            icon={<Users className="text-green-600" />}
            trend="+8% from last quarter"
          />
          <StatCard
            title="Budget Utilization"
            value="87%"
            icon={<TrendingUp className="text-orange-600" />}
            trend="Target: 90%"
          />
        </div>

        <DistrictChart />

        <footer className="mt-10 text-center text-sm text-gray-500">
          Data source: data.gov.in — MGNREGA Open API
        </footer>
      </main>
    </div>
  );
}
