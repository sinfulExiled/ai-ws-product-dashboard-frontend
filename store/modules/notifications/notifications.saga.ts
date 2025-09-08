import { eventChannel } from "redux-saga";
import { call, put, take, fork } from "redux-saga/effects";
import { addNotification } from "./notifications.slice";
import { summarize } from "../../../lib/aiApi";
import { WS_URL } from "../../../constants/api";

function createWebsocketChannel() {
  return eventChannel((emit) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    const wsUrl = token ? `${WS_URL}?token=${token}` : WS_URL;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => console.log("WS connected");
    ws.onmessage = (ev) => {
      try {
        emit(JSON.parse(ev.data));
      } catch {}
    };
    ws.onerror = (err) => console.error("WS error", err);
    ws.onclose = () => console.log("WS closed");

    return () => {
      try {
        ws.close();
      } catch {}
    };
  });
}

function* watchWebsocket(): Generator<any, void, any> {
  const chan: any = yield call(createWebsocketChannel);
  while (true) {
    const event = yield take(chan);
    try {
      const ai = yield call(summarize, event);
      yield put(
        addNotification({
          id: String(Date.now()),
          message: ai?.summary ?? event.message,
          type:
            event.type === "AIRecommendation"
              ? "ai_insight"
              : event.type === "LowStockWarning"
              ? "warning"
              : "info",
          timestamp: Date.now(),
          productId: event.productId,
        })
      );
    } catch (err) {
      yield put(
        addNotification({
          id: String(Date.now()),
          message: event.message || "Event",
          type: "info",
          timestamp: Date.now(),
          productId: event.productId,
        })
      );
    }
  }
}

export default function* notificationsSaga() {
  yield fork(watchWebsocket);
}
