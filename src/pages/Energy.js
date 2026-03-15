import SideMenu from "../components/SideMenu";

function Energy() {
  return (
    <div className="flex min-h-screen">
      <SideMenu />

      <div className="flex flex-col w-full">
        <main className="flex-1 px-12 pt-12">

          {/* Header */}
          <h1 className="text-4xl font-bold mb-2">Energy Analytics</h1>
          <p className="text-gray-600 mb-10">
            Monitor energy consumption and system performance metrics
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

            <div className="bg-white p-6 rounded-xl shadow">
              <p>Total Energy Consumption</p>
              <h2 className="text-3xl font-bold">---</h2>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <p>Carbon Footprint</p>
              <h2 className="text-3xl font-bold">---</h2>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <p>Active Devices</p>
              <h2 className="text-3xl font-bold">---</h2>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <p>System Efficiency</p>
              <h2 className="text-3xl font-bold">---</h2>
            </div>

          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

            {/* Chart 1 */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold mb-4">
                Hourly Energy Consumption
              </h3>

              <svg viewBox="0 0 600 220" className="w-full h-56">
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

            {/* Chart 2 */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold mb-4">
                System Efficiency Trend
              </h3>

              <svg viewBox="0 0 600 220" className="w-full h-56">
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

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Device Energy */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold mb-4">
                Energy Consumption by Device Type
              </h3>

              <ul>
                <li className="flex justify-between">
                  <span>Device</span>
                  <span>--%</span>
                </li>
              </ul>
            </div>

            {/* Table */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold mb-4">
                Top Energy Consumers
              </h3>

              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="p-2">Device</th>
                    <th className="p-2">Energy</th>
                    <th className="p-2">Temperature</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className="p-2">---</td>
                    <td className="p-2">---</td>
                    <td className="p-2">---</td>
                  </tr>
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