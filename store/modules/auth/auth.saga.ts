import { call, put, takeLatest } from "redux-saga/effects";
import { loginRequest, loginSuccess, loginFailure } from "./auth.slice";
import { API_BASE } from "../../../constants/api";

function* loginWorker(action: any): Generator<any, void, any> {
  try {
    const res = yield call(fetch, `${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(action.payload),
    });
    const data = yield res.json();
    if (!res.ok) {
      yield put(loginFailure(data.error || "Login failed"));
      return;
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", data.accessToken);
    }
    const payload = JSON.parse(atob(data.accessToken.split(".")[1]));
    yield put(
      loginSuccess({
        token: data.accessToken,
        user: { id: payload.userId, role: payload.role, email: payload.email },
      })
    );
  } catch (err: any) {
    yield put(loginFailure(err.message));
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, loginWorker);
}
