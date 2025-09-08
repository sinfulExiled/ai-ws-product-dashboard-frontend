import { all, fork } from "redux-saga/effects";
import productsSaga from "./modules/products/products.saga";
import notificationsSaga from "./modules/notifications/notifications.saga";
import authSaga from "./modules/auth/auth.saga";

export default function* rootSaga() {
  yield all([fork(productsSaga), fork(notificationsSaga), fork(authSaga)]);
}
