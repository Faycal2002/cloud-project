import SideMenu from "../components/SideMenu";

function Devices() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideMenu />

      <div className="flex-1 p-6 md:p-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Device Management
            </h1>
            <p className="text-gray-500 mt-1">
              Monitor and control all factory devices in one place
            </p>
          </div>

          <button className="mt-4 md:mt-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2.5 rounded-lg shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Device
          </button>
        </div>

        {/* Search & Filter */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row gap-4 md:items-center">

            <div className="flex items-center border rounded-lg px-3 py-2 w-full md:w-2/3">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search devices by name, ID, or type..."
                className="ml-2 w-full outline-none text-sm"
              />
            </div>

             {/* Filter Button */}
    <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100">
      <i className="fa-solid fa-filter"></i></button>

            <select className="border rounded-lg px-4 py-2 text-sm w-full md:w-auto">
              <option>All Status</option>
              <option>Running</option>
              <option>Idle</option>
              <option>Error</option>
            </select>
          </div>

          <p className="text-sm text-gray-500 mt-2">Showing 10 of 10 devices</p>
        </div>

        {/* Devices Table */}
        <div
          className="bg-white rounded-3xl border border-gray-100 overflow-x-auto"
          style={{
            boxShadow:
              "0 10px 25px -5px rgba(0,0,0,0.02), 0 8px 10px -6px rgba(0,0,0,0.02)",
          }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[#64748b] font-semibold text-xs uppercase tracking-wider border-b border-gray-200">
                <th className="pl-6 pr-2 py-4 text-left">DEVICE ID</th>
                <th className="px-2 py-4 text-left">DEVICE NAME</th>
                <th className="px-2 py-4 text-left">DEVICE TYPE</th>
                <th className="px-2 py-4 text-left">STATUS</th>
                <th className="px-2 py-4 text-left">TEMPERATURE</th>
                <th className="px-2 py-4 text-left">ENERGY USAGE</th>
                <th className="px-2 py-4 text-left">LAST UPDATED</th>
                <th className="px-2 py-4 text-left">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {/* DEV-001 */}
              <tr className="border-b border-gray-100 hover:bg-gray-50/50">
                <td className="pl-6 pr-2 py-3 font-mono text-xs font-medium">
                  DEV-001
                </td>
                <td className="px-2 py-3 font-medium">Compressor Unit A1</td>
                <td className="px-2 py-3 text-gray-500">Air Compressor</td>
                <td className="px-2 py-3">
                  <span className="bg-[#e6f7e6] text-[#0e6245] px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
                    <i className="fa-solid fa-play text-[10px]"></i> Running
                  </span>
                </td>
                <td className="px-2 py-3">
                  <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                    24°C
                  </span>
                </td>
                <td className="px-2 py-3 font-medium">45.2 kWh</td>
                <td className="px-2 py-3 text-gray-400 text-xs">2 min ago</td>
                <td className="px-2 py-3" >
                  <i className="fa-regular fa-eye text-gray-400 hover:text-gray-700 mx-1 cursor-pointer"></i>
                  <i className="fa-regular fa-pen-to-square text-gray-400 hover:text-gray-700 mx-1 cursor-pointer"></i>
                  <i className="fa-regular fa-trash-can text-gray-400 hover:text-gray-700 mx-1 cursor-pointer"></i>
                </td>
              </tr>

              {/* DEV-002 */}
              <tr className="border-b border-gray-100 hover:bg-gray-50/50">
                <td className="pl-6 pr-2 py-3 font-mono text-xs font-medium">
                  DEV-002
                </td>
                <td className="px-2 py-3 font-medium">Conveyor Belt B2</td>
                <td className="px-2 py-3 text-gray-500">Conveyor System</td>
                <td className="px-2 py-3">
                  <span className="bg-[#e6f7e6] text-[#0e6245] px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
                    <i className="fa-solid fa-play text-[10px]"></i> Running
                  </span>
                </td>
                <td className="px-2 py-3">
                  <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                    21°C
                  </span>
                </td>
                <td className="px-2 py-3 font-medium">32.8 kWh</td>
                <td className="px-2 py-3 text-gray-400 text-xs">5 min ago</td>
                <td className="px-2 py-3">
                  <i className="fa-regular fa-eye text-gray-400 hover:text-gray-700 mx-1 cursor-pointer"></i>
                  <i className="fa-regular fa-pen-to-square text-gray-400 hover:text-gray-700 mx-1 cursor-pointer"></i>
                  <i className="fa-regular fa-trash-can text-gray-400 hover:text-gray-700 mx-1 cursor-pointer"></i>
                </td>
              </tr>

              {/* DEV-003 */}
              <tr className="border-b border-gray-100 hover:bg-gray-50/50">
                <td className="pl-6 pr-2 py-3 font-mono text-xs font-medium">
                  DEV-003
                </td>
                <td className="px-2 py-3 font-medium">Packaging Machine C3</td>
                <td className="px-2 py-3 text-gray-500">Packaging Unit</td>
                <td className="px-2 py-3">
                  <span className="bg-[#fff3e0] text-[#a45117] px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
                    <i className="fa-regular fa-pause text-[10px]"></i> Idle
                  </span>
                </td>
                <td className="px-2 py-3">
                  <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                    23°C
                  </span>
                </td>
                <td className="px-2 py-3 font-medium">8.5 kWh</td>
                <td className="px-2 py-3 text-gray-400 text-xs">12 min ago</td>
                <td className="px-2 py-3">
                  <i className="fa-regular fa-eye text-gray-400 hover:text-gray-700 mx-1 cursor-pointer"></i>
                  <i className="fa-regular fa-pen-to-square text-gray-400 hover:text-gray-700 mx-1 cursor-pointer"></i>
                  <i className="fa-regular fa-trash-can text-gray-400 hover:text-gray-700 mx-1 cursor-pointer"></i>
                </td>
              </tr>

              {/* DEV-004 */}
              <tr className="border-b border-gray-100 hover:bg-gray-50/50">
                <td className="pl-6 pr-2 py-3 font-mono text-xs font-medium">
                  DEV-004
                </td>
                <td className="px-2 py-3 font-medium">Cooling System D1</td>
                <td className="px-2 py-3 text-gray-500">HVAC Unit</td>
                <td className="px-2 py-3">
                  <span className="bg-[#e6f7e6] text-[#0e6245] px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
                    <i className="fa-solid fa-play text-[10px]"></i> Running
                  </span>
                </td>
                <td className="px-2 py-3">
                  <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                    18°C
                  </span>
                </td>
                <td className="px-2 py-3 font-medium">62.3 kWh</td>
                <td className="px-2 py-3 text-gray-400 text-xs">1 min ago</td>
                <td className="px-2 py-3">
                  <i className="fa-regular fa-eye text-gray-400 hover:text-gray-700 mx-1 cursor-pointer"></i>
                  <i className="fa-regular fa-pen-to-square text-gray-400 hover:text-gray-700 mx-1 cursor-pointer"></i>
                  <i className="fa-regular fa-trash-can text-gray-400 hover:text-gray-700 mx-1 cursor-pointer"></i>
                </td>
              </tr>

              {/* DEV-005 - Error */}
              <tr className="border-b border-gray-100 hover:bg-gray-50/50">
                <td className="pl-6 pr-2 py-3 font-mono text-xs font-medium">
                  DEV-005
                </td>
                <td className="px-2 py-3 font-medium">Quality Scanner E2</td>
                <td className="px-2 py-3 text-gray-500">Inspection System</td>
                <td className="px-2 py-3">
                  <span className="bg-[#ffe8e8] text-[#b91c1c] px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
                    <i className="fa-solid fa-triangle-exclamation text-[10px]"></i>{" "}
                    Error
                  </span>
                </td>
                <td className="px-2 py-3">
                  <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                    25°C
                  </span>
                </td>
                <td className="px-2 py-3 font-medium">12.1 kWh</td>
                <td className="px-2 py-3 text-gray-400 text-xs">3 min ago</td>
                <td className="px-2 py-3">
                  <i className="fa-regular fa-eye text-gray-400 hover:text-gray-700 mx-1 cursor-pointer"></i>
                  <i className="fa-regular fa-pen-to-square text-gray-400 hover:text-gray-700 mx-1 cursor-pointer"></i>
                  <i className="fa-regular fa-trash-can text-gray-400 hover:text-gray-700 mx-1 cursor-pointer"></i>
                </td>
              </tr>

              {/* DEV-006 */}
              <tr className="border-b border-gray-100 hover:bg-gray-50/50">
                <td className="pl-6 pr-2 py-3 font-mono text-xs font-medium">
                  DEV-006
                </td>
                <td className="px-2 py-3 font-medium">Robotic Arm F3</td>
                <td className="px-2 py-3 text-gray-500">Assembly Robot</td>
                <td className="px-2 py-3">
                  <span className="bg-[#e6f7e6] text-[#0e6245] px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
                    <i className="fa-solid fa-play text-[10px]"></i> Running
                  </span>
                </td>
                <td className="px-2 py-3">
                  <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                    26°C
                  </span>
                </td>
                <td className="px-2 py-3 font-medium">58.9 kWh</td>
                <td className="px-2 py-3 text-gray-400 text-xs">7 min ago</td>
                <td className="px-2 py-3">
                  <i className="fa-regular fa-eye text-gray-400 hover:text-gray-700 mx-1 cursor-pointer"></i>
                  <i className="fa-regular fa-pen-to-square text-gray-400 hover:text-gray-700 mx-1 cursor-pointer"></i>
                  <i className="fa-regular fa-trash-can text-gray-400 hover:text-gray-700 mx-1 cursor-pointer"></i>
                </td>
              </tr>

              {/* DEV-007 */}
              <tr className="border-b border-gray-100 hover:bg-gray-50/50">
                <td className="pl-6 pr-2 py-3 font-mono text-xs font-medium">
                  DEV-007
                </td>
                <td className="px-2 py-3 font-medium">Heating Unit G1</td>
                <td className="px-2 py-3 text-gray-500">Industrial Heater</td>
                <td className="px-2 py-3">
                  <span className="bg-[#fff3e0] text-[#a45117] px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
                    <i className="fa-regular fa-pause text-[10px]"></i> Idle
                  </span>
                </td>
                <td className="px-2 py-3">
                  <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                    22°C
                  </span>
                </td>
                <td className="px-2 py-3 font-medium">15.4 kWh</td>
                <td className="px-2 py-3 text-gray-400 text-xs">20 min ago</td>
                <td className="px-2 py-3">
                  <i className="fa-regular fa-eye text-gray-400 hover:text-gray-700 mx-1 cursor-pointer"></i>
                  <i className="fa-regular fa-pen-to-square text-gray-400 hover:text-gray-700 mx-1 cursor-pointer"></i>
                  <i className="fa-regular fa-trash-can text-gray-400 hover:text-gray-700 mx-1 cursor-pointer"></i>
                </td>
              </tr>

              {/* DEV-008 */}
              <tr className="border-b border-gray-100 hover:bg-gray-50/50">
                <td className="pl-6 pr-2 py-3 font-mono text-xs font-medium">
                  DEV-008
                </td>
                <td className="px-2 py-3 font-medium">Ventilation Unit H2</td>
                <td className="px-2 py-3 text-gray-500">HVAC Unit</td>
                <td className="px-2 py-3">
                  <span className="bg-[#e6f7e6] text-[#0e6245] px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
                    <i className="fa-solid fa-play text-[10px]"></i> Running
                  </span>
                </td>
                <td className="px-2 py-3">
                  <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                    20°C
                  </span>
                </td>
                <td className="px-2 py-3 font-medium">18.2 kWh</td>
                <td className="px-2 py-3 text-gray-400 text-xs">10 min ago</td>
                <td className="px-2 py-3">
                  <i className="fa-regular fa-eye text-gray-400 hover:text-gray-700 mx-1 cursor-pointer"></i>
                  <i className="fa-regular fa-pen-to-square text-gray-400 hover:text-gray-700 mx-1 cursor-pointer"></i>
                  <i className="fa-regular fa-trash-can text-gray-400 hover:text-gray-700 mx-1 cursor-pointer"></i>
                </td>
              </tr>

              {/* DEV-009 */}
              <tr className="border-b border-gray-100 hover:bg-gray-50/50">
                <td className="pl-6 pr-2 py-3 font-mono text-xs font-medium">
                  DEV-009
                </td>
                <td className="px-2 py-3 font-medium">Pump Station J5</td>
                <td className="px-2 py-3 text-gray-500">Pump System</td>
                <td className="px-2 py-3">
                  <span className="bg-[#e6f7e6] text-[#0e6245] px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
                    <i className="fa-solid fa-play text-[10px]"></i> Running
                  </span>
                </td>
                <td className="px-2 py-3">
                  <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                    19°C
                  </span>
                </td>
                <td className="px-2 py-3 font-medium">27.5 kWh</td>
                <td className="px-2 py-3 text-gray-400 text-xs">8 min ago</td>
                <td className="px-2 py-3">
                  <i className="fa-regular fa-eye text-gray-400 hover:text-gray-700 mx-1 cursor-pointer"></i>
                  <i className="fa-regular fa-pen-to-square text-gray-400 hover:text-gray-700 mx-1 cursor-pointer"></i>
                  <i className="fa-regular fa-trash-can text-gray-400 hover:text-gray-700 mx-1 cursor-pointer"></i>
                </td>
              </tr>

              {/* DEV-010 */}
              <tr className="hover:bg-gray-50/50">
                <td className="pl-6 pr-2 py-3 font-mono text-xs font-medium">
                  DEV-010
                </td>
                <td className="px-2 py-3 font-medium">Mixer Unit K7</td>
                <td className="px-2 py-3 text-gray-500">Industrial Mixer</td>
                <td className="px-2 py-3">
                  <span className="bg-[#fff3e0] text-[#a45117] px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
                    <i className="fa-regular fa-pause text-[10px]"></i> Idle
                  </span>
                </td>
                <td className="px-2 py-3">
                  <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                    22°C
                  </span>
                </td>
                <td className="px-2 py-3 font-medium">9.8 kWh</td>
                <td className="px-2 py-3 text-gray-400 text-xs">15 min ago</td>
                <td className="px-2 py-3">
                  <i className="fa-regular fa-eye text-gray-400 hover:text-gray-700 mx-1 cursor-pointer"></i>
                  <i className="fa-regular fa-pen-to-square text-gray-400 hover:text-gray-700 mx-1 cursor-pointer"></i>
                  <i className="fa-regular fa-trash-can text-gray-400 hover:text-gray-700 mx-1 cursor-pointer"></i>
                </td>
              </tr>
            </tbody>
          </table>

          
        </div>
      </div>
    </div>
  );
}

export default Devices;