import { r as reactExports } from "../_libs/react.mjs";
import { A as API_URL } from "./client-Bk_QgbDl.mjs";
function useApiLatency(intervalMs = 3e4) {
  const [latency, setLatency] = reactExports.useState(null);
  const [online, setOnline] = reactExports.useState(true);
  reactExports.useEffect(() => {
    let stopped = false;
    let timer;
    async function ping() {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 5e3);
      const started = performance.now();
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/Offer/all`, {
          cache: "no-store",
          headers: token ? { Authorization: `Bearer ${token}` } : void 0,
          signal: controller.signal
        });
        if (!stopped) {
          setLatency(Math.max(1, Math.round(performance.now() - started)));
          setOnline(response.ok);
        }
      } catch {
        if (!stopped) {
          setLatency(null);
          setOnline(false);
        }
      } finally {
        window.clearTimeout(timeout);
        if (!stopped) {
          timer = window.setTimeout(ping, intervalMs);
        }
      }
    }
    ping();
    return () => {
      stopped = true;
      if (timer) window.clearTimeout(timer);
    };
  }, [intervalMs]);
  return { latency, online };
}
export {
  useApiLatency as u
};
