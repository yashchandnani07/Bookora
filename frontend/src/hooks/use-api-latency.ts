import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api/client";

export function useApiLatency(intervalMs = 30000) {
  const [latency, setLatency] = useState<number | null>(null);
  const [online, setOnline] = useState(true);

  useEffect(() => {
    let stopped = false;
    let timer: number | undefined;

    async function ping() {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 5000);
      const started = performance.now();

      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/Offer/all`, {
          cache: "no-store",
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          signal: controller.signal,
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
