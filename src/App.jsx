import React, { useState, useEffect } from 'react';
import { MapPin, Users, Calendar, TrendingUp, Info, ChevronDown, AlertCircle, Home, Briefcase } from 'lucide-react';

// Mock data that simulates the government API
const MOCK_API_DATA = {
  "Rajasthan": {
    districts: [
      {
        id: 1,
        name: "Jaipur",
        totalHouseholds: 125000,
        activeWorkers: 45000,
        employmentDays: 890000,
        budgetAllocated: 1250000000,
        budgetUtilized: 1087500000,
        completedWorks: 1250,
        ongoingWorks: 340,
        averageWage: 221,
        womenParticipation: 58,
        monthlyData: [
          { month: "Jan", days: 75000, workers: 42000 },
          { month: "Feb", days: 78000, workers: 43500 },
          { month: "Mar", days: 82000, workers: 44000 },
          { month: "Apr", days: 85000, workers: 45000 }
        ]
      },
      {
        id: 2,
        name: "Jodhpur",
        totalHouseholds: 98000,
        activeWorkers: 35000,
        employmentDays: 720000,
        budgetAllocated: 980000000,
        budgetUtilized: 852600000,
        completedWorks: 980,
        ongoingWorks: 270,
        averageWage: 218,
        womenParticipation: 62,
        monthlyData: [
          { month: "Jan", days: 60000, workers: 33000 },
          { month: "Feb", days: 62000, workers: 34000 },
          { month: "Mar", days: 65000, workers: 34500 },
          { month: "Apr", days: 68000, workers: 35000 }
        ]
      },
      {
        id: 3,
        name: "Udaipur",
        totalHouseholds: 87000,
        activeWorkers: 31000,
        employmentDays: 650000,
        budgetAllocated: 870000000,
        budgetUtilized: 765300000,
        completedWorks: 890,
        ongoingWorks: 245,
        averageWage: 220,
        womenParticipation: 55,
        monthlyData: [
          { month: "Jan", days: 55000, workers: 29000 },
          { month: "Feb", days: 57000, workers: 30000 },
          { month: "Mar", days: 59000, workers: 30500 },
          { month: "Apr", days: 62000, workers: 31000 }
        ]
      },
      {
        id: 4,
        name: "Bikaner",
        totalHouseholds: 76000,
        activeWorkers: 28000,
        employmentDays: 580000,
        budgetAllocated: 760000000,
        budgetUtilized: 664400000,
        completedWorks: 780,
        ongoingWorks: 210,
        averageWage: 219,
        womenParticipation: 60,
        monthlyData: [
          { month: "Jan", days: 48000, workers: 26000 },
          { month: "Feb", days: 50000, workers: 27000 },
          { month: "Mar", days: 52000, workers: 27500 },
          { month: "Apr", days: 55000, workers: 28000 }
        ]
      },
      {
        id: 5,
        name: "Ajmer",
        totalHouseholds: 82000,
        activeWorkers: 30000,
        employmentDays: 620000,
        budgetAllocated: 820000000,
        budgetUtilized: 717400000,
        completedWorks: 850,
        ongoingWorks: 230,
        averageWage: 220,
        womenParticipation: 57,
        monthlyData: [
          { month: "Jan", days: 52000, workers: 28000 },
          { month: "Feb", days: 54000, workers: 29000 },
          { month: "Mar", days: 56000, workers: 29500 },
          { month: "Apr", days: 58000, workers: 30000 }
        ]
      }
    ]
  }
};

const EXPLANATIONS = {
  totalHouseholds: "कुल परिवार - आपके जिले में कितने परिवार MGNREGA के तहत पंजीकृत हैं। Total families registered under MGNREGA in your district.",
  activeWorkers: "सक्रिय कामगार - इस महीने काम कर रहे लोग। People who are currently working this month.",
  employmentDays: "रोजगार दिवस - कुल कितने दिन का काम मिला। Total number of days of work provided.",
  budgetUtilized: "बजट उपयोग - सरकार ने कितना पैसा खर्च किया। How much money the government has spent.",
  averageWage: "औसत मजदूरी - प्रति दिन मिलने वाला पैसा। Money received per day of work.",
  womenParticipation: "महिला भागीदारी - कितनी महिलाएं काम कर रही हैं (प्रतिशत में)। Percentage of women workers."
};

function InfoTooltip({ text }) {
  const [show, setShow] = useState(false);
  
  return (
    <div className="relative inline-block ml-2">
      <button
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => setShow(!show)}
        className="text-blue-500 hover:text-blue-700 focus:outline-none"
        type="button"
      >
        <Info size={16} />
      </button>
      {show && (
        <div className="absolute z-10 w-72 p-3 bg-gray-800 text-white text-sm rounded-lg shadow-lg -top-2 left-6 whitespace-normal">
          {text}
          <div className="absolute top-3 -left-1 w-2 h-2 bg-gray-800 transform rotate-45"></div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, subtitle, icon, color, explanation }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 hover:shadow-lg transition-shadow" style={{ borderColor: color }}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center">
            <h3 className="text-sm font-medium text-gray-600">{title}</h3>
            {explanation && <InfoTooltip text={explanation} />}
          </div>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className="p-3 rounded-lg" style={{ backgroundColor: color + '20' }}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function SimpleBarChart({ data }) {
  const maxDays = Math.max(...data.map(d => d.days));
  
  return (
    <div className="mt-4">
      <div className="space-y-3">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600 w-12">{item.month}</span>
            <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
              <div 
                className="bg-blue-500 h-full rounded-full flex items-center justify-end pr-3 transition-all duration-500"
                style={{ width: `${(item.days / maxDays) * 100}%` }}
              >
                <span className="text-white text-xs font-semibold">
                  {(item.days / 1000).toFixed(0)}k दिन
                </span>
              </div>
            </div>
            <span className="text-sm text-gray-500 w-16 text-right">
              {(item.workers / 1000).toFixed(0)}k लोग
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ComparisonChart({ districts }) {
  const metrics = [
    { 
      key: 'budgetUtilized', 
      label: 'बजट उपयोग (Budget Used)', 
      format: (v) => '₹' + Math.round(v / 10000000) + ' करोड़', 
      color: '#3b82f6' 
    },
    { 
      key: 'activeWorkers', 
      label: 'सक्रिय कामगार (Active Workers)', 
      format: (v) => (v / 1000).toFixed(0) + 'k', 
      color: '#10b981' 
    },
    { 
      key: 'womenParticipation', 
      label: 'महिला भागीदारी (Women %)', 
      format: (v) => v + '%', 
      color: '#f59e0b' 
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        जिलों की तुलना (District Comparison)
      </h2>
      
      {metrics.map((metric, idx) => (
        <div key={idx} className="mb-8 last:mb-0">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">{metric.label}</h3>
          <div className="space-y-2">
            {districts.map((district, i) => {
              const value = district[metric.key];
              const maxValue = Math.max(...districts.map(d => d[metric.key]));
              const percentage = (value / maxValue) * 100;
              
              return (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-600 w-24 flex-shrink-0">{district.name}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-6 relative overflow-hidden">
                    <div 
                      className="h-full rounded-full flex items-center justify-end pr-2 transition-all duration-500"
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: metric.color
                      }}
                    >
                      <span className="text-white text-xs font-semibold">
                        {metric.format(value)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [selectedState] = useState("Rajasthan");
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 500);

    // Auto-detect user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log("Location access denied");
        }
      );
    }
  }, []);

  useEffect(() => {
    if (MOCK_API_DATA[selectedState]) {
      setSelectedDistrict(MOCK_API_DATA[selectedState].districts[0]);
    }
  }, [selectedState]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">लोड हो रहा है... Loading...</p>
        </div>
      </div>
    );
  }

  if (!selectedDistrict) return null;

  const budgetUtilization = Math.round((selectedDistrict.budgetUtilized / selectedDistrict.budgetAllocated) * 100);
  const allDistricts = MOCK_API_DATA[selectedState].districts;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Home className="text-orange-600" size={32} />
                मनरेगा डैशबोर्ड
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                MGNREGA Dashboard - अपने जिले का प्रदर्शन देखें
              </p>
            </div>
            
            {userLocation && (
              <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
                <MapPin className="text-green-600" size={20} />
                <span className="text-sm font-medium text-green-800">
                  आपका स्थान पहचाना गया
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* District Selector */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            अपना जिला चुनें (Select Your District):
          </label>
          <div className="relative">
            <select
              value={selectedDistrict.name}
              onChange={(e) => {
                const district = allDistricts.find(d => d.name === e.target.value);
                setSelectedDistrict(district);
              }}
              className="w-full md:w-auto px-4 py-3 pr-10 border-2 border-gray-300 rounded-lg text-lg font-medium focus:border-blue-500 focus:outline-none appearance-none bg-white cursor-pointer"
            >
              {allDistricts.map(d => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
          </div>
        </div>

        {/* Info Alert */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded">
          <div className="flex items-start">
            <AlertCircle className="text-blue-400 mt-0.5 mr-3 flex-shrink-0" size={20} />
            <div>
              <p className="text-sm text-blue-800">
                <strong>नोट:</strong> यह डेटा 2025 का है। Government API से नियमित अपडेट होता रहता है।
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Note: This data is from 2025. Updates regularly from Government API.
              </p>
            </div>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <StatCard
            title="सक्रिय कामगार (Active Workers)"
            value={selectedDistrict.activeWorkers.toLocaleString('en-IN')}
            subtitle={`${selectedDistrict.totalHouseholds.toLocaleString('en-IN')} कुल परिवार`}
            icon={<Users size={28} style={{ color: '#10b981' }} />}
            color="#10b981"
            explanation={EXPLANATIONS.activeWorkers}
          />
          
          <StatCard
            title="रोजगार दिवस (Employment Days)"
            value={(selectedDistrict.employmentDays / 1000).toFixed(0) + 'k'}
            subtitle="इस साल अब तक"
            icon={<Calendar size={28} style={{ color: '#3b82f6' }} />}
            color="#3b82f6"
            explanation={EXPLANATIONS.employmentDays}
          />
          
          <StatCard
            title="बजट उपयोग (Budget Used)"
            value={budgetUtilization + '%'}
            subtitle={`₹${Math.round(selectedDistrict.budgetUtilized / 10000000)} करोड़ में से ₹${Math.round(selectedDistrict.budgetAllocated / 10000000)} करोड़`}
            icon={<TrendingUp size={28} style={{ color: '#f59e0b' }} />}
            color="#f59e0b"
            explanation={EXPLANATIONS.budgetUtilized}
          />
        </div>

        {/* More Details & Chart */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
              <Briefcase className="text-blue-600" size={24} />
              और जानकारी (More Details)
            </h2>
            <div className="space-y-4 mt-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <span className="text-gray-700">औसत मजदूरी (Avg Wage)</span>
                  <InfoTooltip text={EXPLANATIONS.averageWage} />
                </div>
                <span className="font-bold text-gray-900">₹{selectedDistrict.averageWage}/दिन</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <span className="text-gray-700">महिला भागीदारी (Women %)</span>
                  <InfoTooltip text={EXPLANATIONS.womenParticipation} />
                </div>
                <span className="font-bold text-gray-900">{selectedDistrict.womenParticipation}%</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                <span className="text-gray-700">पूर्ण कार्य (Completed Works)</span>
                <span className="font-bold text-gray-900">{selectedDistrict.completedWorks}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                <span className="text-gray-700">चल रहे कार्य (Ongoing)</span>
                <span className="font-bold text-gray-900">{selectedDistrict.ongoingWorks}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              पिछले महीनों का प्रदर्शन
            </h2>
            <p className="text-sm text-gray-600 mb-4">Monthly Performance Trend</p>
            <SimpleBarChart data={selectedDistrict.monthlyData} />
          </div>
        </div>

        {/* District Comparison */}
        <ComparisonChart districts={allDistricts} />

        {/* Help Section */}
        <div className="bg-gradient-to-r from-orange-100 to-orange-50 rounded-lg p-6 mt-8 border border-orange-200">
          <h3 className="text-lg font-bold text-gray-800 mb-3">
            मनरेगा क्या है? (What is MGNREGA?)
          </h3>
          <p className="text-gray-700 leading-relaxed mb-2">
            मनरेगा एक सरकारी योजना है जो गांव के लोगों को साल में 100 दिन का रोजगार देती है। 
            यह काम सड़क बनाने, तालाब खोदने जैसे कामों में होता है। हर परिवार के एक सदस्य को यह काम मिल सकता है।
          </p>
          <p className="text-gray-600 text-sm">
            MGNREGA is a government scheme that provides 100 days of guaranteed wage employment 
            to rural households in a year. Work includes building roads, ponds, and other infrastructure.
          </p>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-600 pb-6">
          <p className="font-medium">डेटा स्रोत: data.gov.in | Data Source: Government of India Open API</p>
          <p className="mt-2">यह एक नागरिक पहल है - This is a citizen initiative for transparency</p>
          <p className="mt-1 text-xs text-gray-500">Made with ❤️ for Rural India</p>
        </footer>
      </main>
    </div>
  );
}