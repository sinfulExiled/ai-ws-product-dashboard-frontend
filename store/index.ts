import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import productsReducer from "./modules/products/products.slice";
import notificationsReducer from "./modules/notifications/notifications.slice";
import authReducer from "./modules/auth/auth.slice";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    products: productsReducer,
    notifications: notificationsReducer,
    auth: authReducer,
  },
  middleware: (gdm) => gdm({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
