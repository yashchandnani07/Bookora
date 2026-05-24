import { A as API_URL } from "./client-Bk_QgbDl.mjs";
const RECORD_SEPARATOR = String.fromCharCode(30);
function getHubUrl() {
  const apiUrl = new URL(API_URL);
  const hubPath = apiUrl.pathname.replace(/\/api\/?$/i, "");
  apiUrl.pathname = `${hubPath}/hubs/bookings`.replace(/\/+/g, "/");
  apiUrl.search = "";
  return apiUrl;
}
function normalizeSlotUpdate(value) {
  return {
    slotId: String(value.slotId ?? value.SlotId ?? ""),
    offerId: String(value.offerId ?? value.OfferId ?? ""),
    capacity: Number(value.capacity ?? value.Capacity ?? 0),
    bookedCount: Number(value.bookedCount ?? value.BookedCount ?? 0),
    remainingCapacity: Number(value.remainingCapacity ?? value.RemainingCapacity ?? 0),
    remainingSlots: Number(value.remainingSlots ?? value.RemainingSlots ?? 0),
    totalSlots: Number(value.totalSlots ?? value.TotalSlots ?? 0),
    status: String(value.status ?? value.Status ?? "")
  };
}
function normalizeOfferCreated(value) {
  return {
    offerId: String(value.offerId ?? value.OfferId ?? ""),
    businessId: String(value.businessId ?? value.BusinessId ?? ""),
    status: String(value.status ?? value.Status ?? "")
  };
}
function subscribeToBookingUpdates(handlers) {
  const onSlotUpdated = typeof handlers === "function" ? handlers : handlers.onSlotUpdated;
  const onOfferCreated = typeof handlers === "function" ? void 0 : handlers.onOfferCreated;
  let socket = null;
  let reconnectTimer;
  let stopped = false;
  async function connect() {
    if (stopped) return;
    try {
      const hubUrl = getHubUrl();
      const negotiateUrl = new URL(hubUrl);
      negotiateUrl.pathname = `${negotiateUrl.pathname}/negotiate`;
      negotiateUrl.searchParams.set("negotiateVersion", "1");
      const negotiateResponse = await fetch(negotiateUrl, {
        method: "POST"
      });
      const negotiate = await negotiateResponse.json();
      const token = negotiate.connectionToken ?? negotiate.connectionId;
      hubUrl.protocol = hubUrl.protocol === "https:" ? "wss:" : "ws:";
      hubUrl.searchParams.set("id", token);
      socket = new WebSocket(hubUrl);
      socket.addEventListener("open", () => {
        socket?.send(JSON.stringify({ protocol: "json", version: 1 }) + RECORD_SEPARATOR);
      });
      socket.addEventListener("message", (message) => {
        const text = String(message.data);
        const frames = text.split(RECORD_SEPARATOR).filter(Boolean);
        for (const frame of frames) {
          const payload = JSON.parse(frame);
          if (payload.type !== 1) {
            continue;
          }
          if (payload.target === "SlotUpdated") {
            const update = normalizeSlotUpdate(payload.arguments?.[0] ?? {});
            if (update.slotId && update.offerId) {
              onSlotUpdated?.(update);
            }
          }
          if (payload.target === "OfferCreated") {
            const offer = normalizeOfferCreated(payload.arguments?.[0] ?? {});
            if (offer.offerId) {
              onOfferCreated?.(offer);
            }
          }
        }
      });
      socket.addEventListener("close", () => {
        if (!stopped) {
          reconnectTimer = window.setTimeout(connect, 2e3);
        }
      });
    } catch (error) {
      console.error("Realtime booking connection failed", error);
      if (!stopped) {
        reconnectTimer = window.setTimeout(connect, 3e3);
      }
    }
  }
  connect();
  return () => {
    stopped = true;
    if (reconnectTimer) {
      window.clearTimeout(reconnectTimer);
    }
    socket?.close();
  };
}
export {
  subscribeToBookingUpdates as s
};
