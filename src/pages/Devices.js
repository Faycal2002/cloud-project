import { useEffect, useMemo, useState } from "react";
import SideMenu from "../components/SideMenu";
import { api } from "../utils/api";
import { formatFullDateTime } from "../utils/date";

function Devices() {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadReadings = async () => {
      try {
        const data = await api.getReadingsHistory();
        if (!mounted) return;
        setHistory(Array.isArray(data) ? data : []);
        setError("");
      } catch (err) {
        if (!mounted) return;
        setError(err.message || "Failed to load readings");
      }
    };

    loadReadings();
    const intervalId = setInterval(loadReadings, 3000);

    return () => {
      mounted = false;
      clearInterval(intervalId);
    };
  }, []);

  const getStatus = (message = "") => {
    if (message.startsWith("CRITICAL")) return "CRITICAL";
    if (message.startsWith("WARNING")) return "WARNING";
    return "OK";
  };

  const deviceRows = useMemo(() => {
    return history.filter((item) => (item.device_id || "unknown-device") === "device-1");
  }, [history]);

  const selectedRows = deviceRows.length > 0 ? deviceRows : history;

  const selectedDeviceId = selectedRows[0]?.device_id || "device-1";

  const latestReading = selectedRows[0] || null;
  const latestStatus = latestReading ? getStatus(latestReading.alert_message) : "NO DATA";

  const badgeClass = (status) => {
    if (status === "CRITICAL") return "bg-red-100 text-red-700";
    if (status === "WARNING") return "bg-amber-100 text-amber-700";
    return "bg-green-100 text-green-700";
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideMenu />

      <div className="flex-1 p-6 md:p-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Device Readings</h1>
          </div>
        </div>

        <button
          type="button"
          className="w-full text-left bg-white p-5 rounded-xl shadow-sm border border-gray-200 mb-6 hover:border-gray-300 transition"
          onClick={() => setShowHistory((previous) => !previous)}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <p className="text-sm text-gray-500">Device</p>
              <h2 className="text-2xl font-bold text-gray-900 mt-1">{selectedDeviceId}</h2>
            </div>

            <div>
              <p className="text-sm text-gray-500">Latest reading</p>
              <p className="text-sm font-semibold text-gray-800 mt-1">
                {latestReading
                  ? `${Number(latestReading.temperature).toFixed(1)}°C / ${Number(latestReading.humidity).toFixed(1)}%`
                  : "No data"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Status</p>
              <span className={`inline-flex mt-1 px-3 py-1 rounded-full text-xs font-medium ${badgeClass(latestStatus)}`}>
                {latestStatus}
              </span>
            </div>

            <div className="text-sm font-medium text-blue-600">
              {showHistory ? "Hide history" : "Show history"}
            </div>
          </div>
          {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
        </button>

        {showHistory && (
          <div className="bg-white rounded-3xl border border-gray-100 overflow-x-auto" style={{ boxShadow: "0 10px 25px -5px rgba(0,0,0,0.02), 0 8px 10px -6px rgba(0,0,0,0.02)" }}>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[#64748b] font-semibold text-xs uppercase tracking-wider border-b border-gray-200">
                  <th className="pl-6 pr-2 py-4 text-left">Device ID</th>
                  <th className="px-2 py-4 text-left">Temperature</th>
                  <th className="px-2 py-4 text-left">Humidity</th>
                  <th className="px-2 py-4 text-left">Status</th>
                  <th className="px-2 py-4 text-left">Message</th>
                  <th className="px-2 py-4 text-left">Date et heure</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {selectedRows.length === 0 ? (
                  <tr>
                    <td className="pl-6 py-6 text-gray-500" colSpan={6}>
                      No readings available.
                    </td>
                  </tr>
                ) : (
                  selectedRows.map((item) => {
                    const status = getStatus(item.alert_message);
                    return (
                      <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                        <td className="pl-6 pr-2 py-3 font-mono text-xs font-medium">{item.device_id || "unknown-device"}</td>
                        <td className="px-2 py-3">{Number(item.temperature).toFixed(1)}°C</td>
                        <td className="px-2 py-3">{Number(item.humidity).toFixed(1)}%</td>
                        <td className="px-2 py-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${badgeClass(status)}`}>
                            {status}
                          </span>
                        </td>
                        <td className="px-2 py-3 text-gray-600">{item.alert_message || "OK"}</td>
                        <td className="px-2 py-3 text-xs text-gray-500">
                          {formatFullDateTime(item.created_at)}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Devices;