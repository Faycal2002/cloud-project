import SideMenu from "../components/SideMenu";

function Energy() {

  const devices = [
    { name: "HVAC Unit D1", usage: "32%" },

  ];

  const topConsumers = [
    { device: "HVAC Unit D1", energy: "2,800 kWh", temp: "24°C" },
  
  ];

  return (
    <div className="flex min-h-screen">
      <SideMenu />

      <div className="flex flex-col w-full">
        <main className="flex-1 px-12 pt-12">

          {/* Page Header */}
          <h1 className="text-4xl font-bold mb-2">Energy Analytics</h1>
          <p className="text-gray-600 mb-10">
            Monitor energy consumption and system performance metrics
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-500">Total Energy Consumption</p>
              <h2 className="text-3xl font-bold mt-2">8,742 kWh</h2>
              <p className="text-red-500 text-sm">-8.4% vs last period</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-500">Carbon Footprint</p>
              <h2 className="text-3xl font-bold mt-2">4.2 tons CO₂</h2>
              <p className="text-green-500 text-sm">-12.3% vs last period</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-500">Active Devices</p>
              <h2 className="text-3xl font-bold mt-2">42</h2>
              <p className="text-green-500 text-sm">+5 vs last period</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-500">System Efficiency</p>
              <h2 className="text-3xl font-bold mt-2">94.2%</h2>
              <p className="text-green-500 text-sm">+2.1% vs last period</p>
            </div>

          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

            {/* Hourly Energy Chart */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold mb-4">
                Hourly Energy Consumption
              </h3>

              <svg viewBox="0 0 600 220" className="w-full h-56">

                {[40,80,120,160].map((y)=>(
                  <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="#e5e7eb"/>
                ))}

                <line x1="40" y1="10" x2="40" y2="190" stroke="#d1d5db"/>
                <line x1="40" y1="180" x2="600" y2="180" stroke="#d1d5db"/>

                <path
                  d="M40 160 C120 140,200 120,280 100 S420 80,540 120"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                />

              </svg>
            </div>

            {/* System Efficiency Trend */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold mb-4">
                System Efficiency Trend
              </h3>

              <svg viewBox="0 0 600 220" className="w-full h-56">

                {[40,80,120,160].map((y)=>(
                  <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="#e5e7eb"/>
                ))}

                <line x1="40" y1="10" x2="40" y2="190" stroke="#d1d5db"/>
                <line x1="40" y1="180" x2="600" y2="180" stroke="#d1d5db"/>

                <path
                  d="M40 140 C120 120,200 100,280 90 S420 70,540 60"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                />

              </svg>
            </div>

          </div>

          {/* Device Energy + Table */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Device Energy Distribution */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold mb-4">
                Energy Consumption by Device Type
              </h3>

              <ul className="space-y-2">
                {devices.map((d,i)=>(
                  <li key={i} className="flex justify-between">
                    <span>{d.name}</span>
                    <span className="font-semibold">{d.usage}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Top Energy Consumers Table */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold mb-4">
                Top Energy Consumers
              </h3>

              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="p-2">Device</th>
                    <th className="p-2">Energy</th>
                    <th className="p-2">Temperature</th>
                  </tr>
                </thead>

                <tbody>
                  {topConsumers.map((d,i)=>(
                    <tr key={i} className="border-b">
                      <td className="p-2">{d.device}</td>
                      <td className="p-2">{d.energy}</td>
                      <td className="p-2">{d.temp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}

export default Energy;