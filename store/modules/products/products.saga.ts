import { call, put, takeLatest } from "redux-saga/effects";
import * as api from "../../../lib/api";
import {
  productLoadRequest,
  productLoadSuccess,
  productLoadFailure,
  productAddRequest,
  productEditRequest,
  productRemoveRequest,
  addProduct,
  updateProduct,
  removeProduct,
} from "./products.slice";

function* loadProducts(): Generator<any, void, any> {
  try {
    const products = yield call(api.apiRequest, "/products", { method: "GET" });
    yield put(productLoadSuccess(products));
  } catch (err: any) {
    yield put(productLoadFailure());
  }
}

function* addWorker(action: any): Generator<any, void, any> {
  try {
    const p = yield call(api.apiRequest, "/products", {
      method: "POST",
      body: JSON.stringify(action.payload),
    });
    yield put(addProduct(p));
  } catch (err) {
    console.error(err);
  }
}

function* editWorker(action: any): Generator<any, void, any> {
  try {
    const p = yield call(api.apiRequest, `/products/${action.payload.id}`, {
      method: "PUT",
      body: JSON.stringify(action.payload),
    });
    yield put(updateProduct(p));
  } catch (err) {
    console.error(err);
  }
}

function* removeWorker(action: any): Generator<any, void, any> {
  try {
    yield call(api.apiRequest, `/products/${action.payload}`, {
      method: "DELETE",
    });
    yield put(removeProduct(action.payload));
  } catch (err) {
    console.error(err);
  }
}

export default function* productsSaga(): Generator<any, void, any> {
  yield takeLatest(productLoadRequest.type, loadProducts);
  yield takeLatest(productAddRequest.type, addWorker);
  yield takeLatest(productEditRequest.type, editWorker);
  yield takeLatest(productRemoveRequest.type, removeWorker);
}
