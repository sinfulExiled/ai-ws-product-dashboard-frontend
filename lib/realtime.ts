import { store } from "../store";
import { addNotification } from "../store/modules/notifications/notifications.slice";
import { WS_URL } from "../constants/api";

export function connectRealtime() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
  const url = token ? `${WS_URL}?token=${token}` : WS_URL;
  const ws = new WebSocket(url);

  ws.onopen = () => console.log("WS connected");
  ws.onmessage = (ev) => {
    try {
      const data = JSON.parse(ev.data);
      store.dispatch(
        addNotification({
          id: String(Date.now()),
          message: data.message || data.summary || "Event",
          type:
            data.type === "AIRecommendation"
              ? "ai_insight"
              : data.type === "LowStockWarning"
              ? "warning"
              : "info",
          timestamp: Date.now(),
          productId: data.productId,
        })
      );
    } catch (err) {
      console.error(err);
    }
  };
  ws.onclose = () => setTimeout(connectRealtime, 2000);
  ws.onerror = (e) => {
    console.error("ws error", e);
    ws.close();
  };

  return ws;
}
