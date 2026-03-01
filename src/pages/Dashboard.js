import SideMenu from "../components/SideMenu";

function Dashboard() {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <SideMenu />

      <div className="p-10 w-full">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Dashboard Overview
          </h1>
          <p className="text-gray-600">
            Welcome back! Here's what's happening with your devices today.
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Active Devices</p>
            <h2 className="text-3xl font-bold mt-2">42</h2>
            <p className="text-green-500 text-sm mt-1">+5 this week</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Energy Consumption</p>
            <h2 className="text-3xl font-bold mt-2">1,248 kWh</h2>
            <p className="text-red-500 text-sm mt-1">-12% vs last week</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Average Temperature</p>
            <h2 className="text-3xl font-bold mt-2">22.4°C</h2>
            <p className="text-gray-400 text-sm mt-1">Optimal range</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">System Efficiency</p>
            <h2 className="text-3xl font-bold mt-2">94.2%</h2>
            <p className="text-green-500 text-sm mt-1">+2.1% improvement</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Line Chart */}
          <div className="bg-white p-6 rounded-xl shadow lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">
              Energy Consumption Over Time
            </h3>

            <svg viewBox="0 0 600 220" className="w-full h-56">
              {/* Grid lines */}
              {[40, 80, 120, 160].map((y) => (
                <line
                  key={y}
                  x1="0"
                  y1={y}
                  x2="600"
                  y2={y}
                  stroke="#e5e7eb"
                />
              ))}

              {/* Axes */}
              <line x1="40" y1="10" x2="40" y2="190" stroke="#d1d5db" />
              <line x1="40" y1="180" x2="600" y2="180" stroke="#d1d5db" />

              {/* Line */}
              <path
                d="M40 150 
                   C120 170, 160 150, 200 120
                   S300 60, 350 70
                   S450 90, 540 130"
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
              />

              {/* Points */}
              {[40, 200, 350, 540].map((x, i) => (
                <circle
                  key={i}
                  cx={x}
                  cy={[150, 120, 70, 130][i]}
                  r="4"
                  fill="#10b981"
                />
              ))}
            </svg>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4">
              Device Status Distribution
            </h3>

            <svg viewBox="0 0 200 200" className="w-48 h-48">
              <circle
                cx="100"
                cy="100"
                r="70"
                fill="none"
                stroke="#10b981"
                strokeWidth="30"
                strokeDasharray="295 440"
                transform="rotate(-90 100 100)"
              />

              <circle
                cx="100"
                cy="100"
                r="70"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="30"
                strokeDasharray="106 440"
                strokeDashoffset="-295"
                transform="rotate(-90 100 100)"
              />

              <circle
                cx="100"
                cy="100"
                r="70"
                fill="none"
                stroke="#ef4444"
                strokeWidth="30"
                strokeDasharray="31 440"
                strokeDashoffset="-401"
                transform="rotate(-90 100 100)"
              />

              <circle
                cx="100"
                cy="100"
                r="70"
                fill="none"
                stroke="#9ca3af"
                strokeWidth="30"
                strokeDasharray="8 440"
                strokeDashoffset="-432"
                transform="rotate(-90 100 100)"
              />
            </svg>

            {/* Legend */}
            <div className="mt-4 text-sm text-gray-600 space-y-1">
              <p className="text-green-500">Running 67%</p>
              <p className="text-yellow-500">Idle 24%</p>
              <p className="text-red-500">Error 7%</p>
              <p className="text-gray-400">Offline 2%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;