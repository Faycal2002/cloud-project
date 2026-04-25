import { useEffect, useMemo, useState } from "react";
import SideMenu from "../components/SideMenu";
import { api } from "../utils/api";

function Energy() {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        const data = await api.getReadingsHistory();
        if (!mounted) return;
        setHistory(Array.isArray(data) ? data : []);
        setError("");
      } catch (err) {
        if (!mounted) return;
        setError(err.message || "Failed to load energy data");
      }
    };

    loadData();
    const intervalId = setInterval(loadData, 3000);

    return () => {
      mounted = false;
      clearInterval(intervalId);
    };
  }, []);

  const stats = useMemo(() => {
    if (history.length === 0) {
      return {
        avgTemp: 0,
        avgHumidity: 0,
        activeDevices: 0,
        criticalCount: 0,
      };
    }

    const totalTemp = history.reduce((sum, item) => sum + Number(item.temperature || 0), 0);
    const totalHumidity = history.reduce((sum, item) => sum + Number(item.humidity || 0), 0);
    const activeDevices = new Set(history.map((item) => item.device_id || "unknown-device")).size;
    const criticalCount = history.filter((item) => (item.alert_message || "").startsWith("CRITICAL")).length;

    return {
      avgTemp: totalTemp / history.length,
      avgHumidity: totalHumidity / history.length,
      activeDevices,
      criticalCount,
    };
  }, [history]);

  const latestReading = history[0] || null;
  const latestAgeMs = latestReading?.created_at ? Date.now() - new Date(latestReading.created_at).getTime() : null;
  const liveWindowMs = 120000;
  const isLiveReading = latestAgeMs !== null && latestAgeMs >= 0 && latestAgeMs <= liveWindowMs;

  const chartData = useMemo(() => {
    const recent = [...history].slice(0, 20).reverse();

    if (recent.length === 0) {
      return {
        path: "",
        points: [],
        statusCounts: { ok: 0, warning: 0, critical: 0 },
      };
    }

    const temperatures = recent.map((item) => Number(item.temperature || 0));
    const minTemp = Math.min(...temperatures);
    const maxTemp = Math.max(...temperatures);
    const range = maxTemp - minTemp || 1;

    const plotLeft = 60;
    const plotRight = 580;
    const plotTop = 60;
    const plotBottom = 220;
    const usableWidth = plotRight - plotLeft;
    const usableHeight = plotBottom - plotTop;

    const points = temperatures.map((temp, index) => {
      const x = recent.length === 1
        ? (plotLeft + plotRight) / 2
        : plotLeft + (usableWidth * index) / (recent.length - 1);
      const normalized = (temp - minTemp) / range;
      const y = plotBottom - normalized * usableHeight;
      return { x, y, temp };
    });

    const path = points
      .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
      .join(" ");

    const statusCounts = history.reduce(
      (accumulator, item) => {
        const message = item.alert_message || "";
        if (message.startsWith("CRITICAL")) accumulator.critical += 1;
        else if (message.startsWith("WARNING")) accumulator.warning += 1;
        else accumulator.ok += 1;
        return accumulator;
      },
      { ok: 0, warning: 0, critical: 0 }
    );

    return { path, points, statusCounts };
  }, [history]);

  const lineColor = isLiveReading ? "#2563eb" : "#dc2626";
  const chartGradientId = isLiveReading ? "chartGradientBlue" : "chartGradientRed";

  const totalStatuses = chartData.statusCounts.ok + chartData.statusCounts.warning + chartData.statusCounts.critical || 1;
  const okPercent = Math.round((chartData.statusCounts.ok / totalStatuses) * 100);
  const wheelPercent = okPercent;
  const wheelOffset = 440 - (440 * wheelPercent) / 100;

  const buildSmoothPath = (points) => {
    if (points.length === 0) return "";
    if (points.length === 1) {
      return `M ${points[0].x} ${points[0].y}`;
    }

    let path = `M ${points[0].x} ${points[0].y}`;

    for (let index = 1; index < points.length; index += 1) {
      const previous = points[index - 1];
      const current = points[index];
      const controlX = (previous.x + current.x) / 2;
      path += ` C ${controlX} ${previous.y}, ${controlX} ${current.y}, ${current.x} ${current.y}`;
    }

    return path;
  };

  const smoothPath = chartData.points.length ? buildSmoothPath(chartData.points) : "";
  const areaPath = chartData.points.length
    ? `${smoothPath} L ${chartData.points[chartData.points.length - 1].x} 220 L ${chartData.points[0].x} 220 Z`
    : "";

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideMenu />

      <main className="flex-1 px-6 md:px-12 py-10">
        <div className="mb-8 flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Energy Analytics</h1>
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${isLiveReading ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {isLiveReading ? 'LIVE STREAM ACTIVE' : 'NO LIVE STREAM'}
            </span>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <p className="text-gray-500 text-sm">Average Temperature</p>
            <h2 className="text-3xl font-bold mt-2 text-gray-900">{stats.avgTemp.toFixed(1)}°C</h2>
          </div>

          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <p className="text-gray-500 text-sm">Average Humidity</p>
            <h2 className="text-3xl font-bold mt-2 text-gray-900">{stats.avgHumidity.toFixed(1)}%</h2>
          </div>

          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <p className="text-gray-500 text-sm">Active Devices</p>
            <h2 className="text-3xl font-bold mt-2 text-gray-900">{stats.activeDevices}</h2>
          </div>

          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <p className="text-gray-500 text-sm">Critical Alerts</p>
            <h2 className="text-3xl font-bold mt-2 text-gray-900">{stats.criticalCount}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="bg-white p-5 rounded-lg border border-gray-200">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">X / Y Graph</h3>
              </div>

              <div className={`rounded-full px-3 py-1 text-xs font-semibold ${isLiveReading ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                {isLiveReading ? 'Live data' : 'No live data'}
              </div>
            </div>

            {history.length === 0 ? (
              <div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-700">
                No readings available.
              </div>
            ) : (
              <div className="mb-0.5 text-sm text-gray-500">Temperature</div>
            )}

            {history.length > 0 && (
              <svg viewBox="0 0 620 280" className="w-full h-80">
                <defs>
                  <clipPath id="chartClip">
                    <rect x="60" y="40" width="520" height="180" rx="0" />
                  </clipPath>
                  <linearGradient id={chartGradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={isLiveReading ? "#2563eb" : "#dc2626"} stopOpacity="0.14" />
                    <stop offset="100%" stopColor={isLiveReading ? "#2563eb" : "#dc2626"} stopOpacity="0.01" />
                  </linearGradient>
                </defs>

                {[70, 110, 150, 190, 220].map((y) => (
                  <line key={y} x1="60" y1={y} x2="580" y2={y} stroke="#e5e7eb" />
                ))}

                <line x1="60" y1="60" x2="60" y2="220" stroke="#cbd5e1" />
                <line x1="60" y1="220" x2="580" y2="220" stroke="#cbd5e1" />

                <g clipPath="url(#chartClip)">
                  {areaPath && <path d={areaPath} fill={`url(#${chartGradientId})`} stroke="none" />}
                  <path d={smoothPath} fill="none" stroke={lineColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                  {chartData.points.map((point, index) => (
                    <circle key={index} cx={point.x} cy={point.y} r="4" fill={lineColor} />
                  ))}
                </g>

                <text x="62" y="245" fontSize="12" fill="#6b7280">Oldest in history</text>
                <text x="500" y="245" fontSize="12" fill="#6b7280">Newest in history</text>
              </svg>
            )}
          </section>

          <section className="bg-white p-5 rounded-lg border border-gray-200 flex flex-col items-center justify-start">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Percentage Wheel</h3>
            <p className="text-sm text-gray-500 mb-6">OK rate from history</p>

            <div className="relative w-52 h-52 flex items-center justify-center">
              <svg viewBox="0 0 220 220" className="w-full h-full -rotate-90">
                <circle cx="110" cy="110" r="70" fill="none" stroke="#e5e7eb" strokeWidth="22" />
                <circle
                  cx="110"
                  cy="110"
                  r="70"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="22"
                  strokeDasharray={`${wheelOffset} 440`}
                  strokeLinecap="round"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-bold text-gray-900">{wheelPercent}%</span>
                <span className="text-xs text-gray-500 uppercase tracking-[0.2em]">OK</span>
              </div>
            </div>

            <div className="mt-6 w-full space-y-2 text-sm">
              <div className="flex items-center justify-between rounded-md bg-gray-50 px-4 py-3">
                <span className="text-gray-700 font-medium">OK</span>
                <span className="text-gray-700 font-semibold">{chartData.statusCounts.ok}</span>
              </div>
              <div className="flex items-center justify-between rounded-md bg-gray-50 px-4 py-3">
                <span className="text-gray-700 font-medium">Warning</span>
                <span className="text-gray-700 font-semibold">{chartData.statusCounts.warning}</span>
              </div>
              <div className="flex items-center justify-between rounded-md bg-gray-50 px-4 py-3">
                <span className="text-gray-700 font-medium">Critical</span>
                <span className="text-gray-700 font-semibold">{chartData.statusCounts.critical}</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Energy;