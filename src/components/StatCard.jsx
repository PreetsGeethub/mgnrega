export function StatCard({ title, value, icon, trend }) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm border">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          {icon}
        </div>
        <p className="text-2xl font-semibold text-gray-900 mt-2">{value}</p>
        <p className="text-xs text-gray-500 mt-1">{trend}</p>
      </div>
    );
  }
  