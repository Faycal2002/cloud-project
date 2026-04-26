import { useEffect, useMemo, useState } from "react";
import SideMenu from "../components/SideMenu";
import { api } from "../utils/api";
import { formatFullDateTime } from "../utils/date";

function Dashboard() {
  const [latest, setLatest] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [lastAlert, setLastAlert] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchLiveData = async () => {
      try {
        const [latestData, historyData] = await Promise.all([
          api.getLatestReading(),

          api.getReadingsHistory(),
        ]);

        if (!isMounted) return;
        setLatest(latestData?.message ? null : latestData);

        // Azure alert check
        if (latestData && latestData.temperature) {
          try {
            const response = await fetch(
              "https://temperature-alert-app-bzf3epb5cnfze6h6.ukwest-01.azurewebsites.net/api/CheckTemperature",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  temperature: latestData.temperature,
                }),
              }
            );

            const alertData = await response.json();
            console.log("Azure response:", alertData);

            //  Prevent duplicate alerts
            if (alertData.alert && alertData.message !== lastAlert) {
              setNotifications((prev) => [
                {
                  message: alertData.message,
                  time: new Date().toLocaleTimeString(),
                },
                ...prev.slice(0, 9), // keep last 10
              ]);
              setLastAlert(alertData.message);
            }

          } catch (err) {
            console.error("Azure Function error:", err);
          }
        }

        setHistory(Array.isArray(historyData) ? historyData : []);
        setError("");
      } catch (err) {
        if (!isMounted) return;
        setError(err.message || "Failed to load live data");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchLiveData();
    const intervalId = setInterval(fetchLiveData, 3000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [lastAlert]);

  const activeDevices = useMemo(() => {
    return new Set(history.map((item) => item.device_id || "unknown-device")).size;
  }, [history]);

  const latestTime = formatFullDateTime(latest?.created_at);

  const readingAgeMs = latest?.created_at
    ? Date.now() - new Date(latest.created_at).getTime()
    : null;

  const isFreshReading =
    readingAgeMs !== null && readingAgeMs >= 0 && readingAgeMs <= 120000;

  const liveReadingLabel =
    latest && isFreshReading
      ? `LIVE READING: ${Number(latest.temperature).toFixed(1)}°C / ${Number(
        latest.humidity
      ).toFixed(1)}%`
      : "NO LIVE READING RECEIVED YET";

  const statusColor = (message = "") => {
    if (message.startsWith("CRITICAL")) return "text-red-600";
    if (message.startsWith("WARNING")) return "text-amber-600";
    return "text-green-600";
  };

  const metricValue = (value, suffix = "") => {
    if (value === null || value === undefined || Number.isNaN(Number(value))) {
      return "No data";
    }
    return `${Number(value).toFixed(1)}${suffix}`;
  };

  return (
    <div className="flex min-h-screen relative">

      <div className="absolute top-5 right-5 z-10">
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative text-2xl"
        >
          🔔

          {notifications.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
              {notifications.length}
            </span>
          )}
        </button>

        {/* // Dropdown  */}
        {showNotifications && (
          <div className="mt-2 w-72 bg-white shadow-lg rounded-lg p-3 border z-50">
            <h3 className="font-semibold mb-2">Notifications</h3>

            {notifications.length === 0 ? (
              <p className="text-gray-500 text-sm">No alerts</p>
            ) : (
              <ul className="space-y-2 max-h-60 overflow-y-auto">
                {notifications.map((n, index) => (
                  <li key={index} className="text-sm border-b pb-1">
                    <span className="block text-red-600 font-medium">
                      {n.message}
                    </span>
                    <span className="text-gray-400 text-xs">{n.time}</span>
                  </li>
                ))}
              </ul>
            )}

            <button
              onClick={() => setNotifications([])}
              className="mt-2 text-xs text-blue-500"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      <SideMenu />

      <div className="flex flex-col flex-1">
        <main className="flex-1 px-6 md:px-12 pt-12">

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Dashboard Overview
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Last update: {latestTime}
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 text-red-700 border border-red-200 rounded-lg p-3 text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-500">Active Devices</p>
              <h2 className="text-3xl font-bold mt-2">{activeDevices || 0}</h2>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-500">Latest Temperature</p>
              <h2 className="text-3xl font-bold mt-2">
                {metricValue(latest?.temperature, "°C")}
              </h2>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-500">Latest Humidity</p>
              <h2 className="text-3xl font-bold mt-2">
                {metricValue(latest?.humidity, "%")}
              </h2>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-500">Current Status</p>
              <h2 className={`text-lg font-bold mt-2 ${statusColor(latest?.alert_message)}`}>
                {latest?.alert_message || "No data yet"}
              </h2>
            </div>

            <div className={`bg-white p-6 rounded-xl shadow border ${latest ? 'border-green-200' : 'border-red-300'}`}>
              <p className="text-gray-500">Live Reading</p>
              <h2 className={`text-lg font-bold mt-2 ${isFreshReading ? 'text-green-600' : 'text-red-600'}`}>
                {liveReadingLabel}
              </h2>
              <p className={`text-sm mt-1 ${isFreshReading ? 'text-green-500' : 'text-red-500'}`}>
                {isFreshReading ? 'Sensor stream active' : 'No recent sensor stream'}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-4">Recent Readings</h3>

            {loading ? (
              <p className="text-gray-500">Loading data...</p>
            ) : history.length === 0 ? (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                No readings available.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500 border-b">
                      <th className="py-2 pr-4">Device</th>
                      <th className="py-2 pr-4">Temperature</th>
                      <th className="py-2 pr-4">Humidity</th>
                      <th className="py-2 pr-4">Status</th>
                      <th className="py-2">Date and time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.slice(0, 8).map((item) => (
                      <tr key={item.id} className="border-b border-gray-100">
                        <td className="py-2 pr-4 font-mono text-xs">{item.device_id || "unknown-device"}</td>
                        <td className="py-2 pr-4">{Number(item.temperature).toFixed(1)}°C</td>
                        <td className="py-2 pr-4">{Number(item.humidity).toFixed(1)}%</td>
                        <td className={`py-2 pr-4 font-medium ${statusColor(item.alert_message)}`}>
                          {item.alert_message || "OK"}
                        </td>
                        <td className="py-2 text-gray-500 text-xs">
                          {formatFullDateTime(item.created_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>

      </div>
    </div>
  );
}
export default Dashboard;

