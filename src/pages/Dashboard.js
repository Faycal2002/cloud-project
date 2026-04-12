import { useEffect, useMemo, useState } from "react";
import SideMenu from "../components/SideMenu";
import { api } from "../utils/api";
import { formatFullDateTime } from "../utils/date";

function Dashboard() {
  const [latest, setLatest] = useState(null);
  const [history, setHistory] = useState([]);
  const [cameraHistory, setCameraHistory] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchLiveData = async () => {
      try {
        const [latestData, historyData, cameraData] = await Promise.all([
          api.getLatestReading(),
          api.getReadingsHistory(),
          api.getCameraEvents(),
        ]);

        if (!isMounted) return;
        setLatest(latestData?.message ? null : latestData);
        setHistory(Array.isArray(historyData) ? historyData : []);
        setCameraHistory(Array.isArray(cameraData) ? cameraData : []);
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
  }, []);

  const activeDevices = useMemo(() => {
    const sensorDeviceIds = history.map((item) => item.device_id || "unknown-device");
    const cameraDeviceIds = cameraHistory.map((item) => item.device_id || "camera-1");
    return new Set([...sensorDeviceIds, ...cameraDeviceIds]).size;
  }, [history, cameraHistory]);

  const latestTime = formatFullDateTime(latest?.created_at);
  const latestCameraEvent = cameraHistory[0] || null;
  const latestCameraTime = formatFullDateTime(latestCameraEvent?.created_at);

  const readingAgeMs = latest?.created_at ? Date.now() - new Date(latest.created_at).getTime() : null;
  const isFreshReading = readingAgeMs !== null && readingAgeMs >= 0 && readingAgeMs <= 120000;
  const noIncomingSensorData = !isFreshReading;

  const cameraAgeMs = latestCameraEvent?.created_at ? Date.now() - new Date(latestCameraEvent.created_at).getTime() : null;
  const isFreshCameraEvent = cameraAgeMs !== null && cameraAgeMs >= 0 && cameraAgeMs <= 300000;

  const liveReadingLabel = latest && isFreshReading
    ? `LIVE READING: ${Number(latest.temperature).toFixed(1)}°C / ${Number(latest.humidity).toFixed(1)}%`
    : "NO LIVE READING RECEIVED YET";

  const currentStatusLabel = noIncomingSensorData
    ? "NO RECEIVING DATA FROM IOT HUB"
    : (latest?.alert_message || "OK");

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
    <div className="flex min-h-screen">
      <SideMenu />

      <div className="flex flex-col flex-1">
        <main className="flex-1 px-6 md:px-12 pt-12">

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Overview</h1>
            <p className="text-sm text-gray-500 mt-1">Last update: {latestTime}</p>
            {noIncomingSensorData && (
              <p className="text-sm text-red-600 mt-2 font-medium">NO RECEIVING DATA FROM IOT HUB</p>
            )}
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
              <h2 className={`text-lg font-bold mt-2 ${noIncomingSensorData ? 'text-red-600' : statusColor(latest?.alert_message)}`}>
                {currentStatusLabel}
              </h2>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-500">Live Reading</p>
              <h2 className={`text-lg font-bold mt-2 ${isFreshReading ? 'text-green-600' : 'text-red-600'}`}>
                {liveReadingLabel}
              </h2>
              <p className={`text-sm mt-1 ${isFreshReading ? 'text-green-500' : 'text-red-500'}`}>
                {isFreshReading ? 'Sensor stream active' : 'No recent sensor stream'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-500">Last Camera Picture</p>
              <h2 className="text-lg font-bold mt-2 text-gray-900">{latestCameraTime}</h2>
              <p className={`text-sm mt-1 ${isFreshCameraEvent ? 'text-gray-600' : 'text-red-500'}`}>
                {latestCameraEvent ? (isFreshCameraEvent ? 'Motion event saved' : 'No recent camera data') : 'No camera image yet'}
              </p>
              {latestCameraEvent && (
                <a
                  href={latestCameraEvent.access_url || latestCameraEvent.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-2 text-sm text-blue-600 hover:text-blue-700"
                >
                  Open latest photo
                </a>
              )}
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
                      <th className="py-2">Date et heure</th>
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