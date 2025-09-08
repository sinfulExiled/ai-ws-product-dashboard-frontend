"use client";
import { Provider } from "react-redux";
import { store } from "../store";
import Navbar from "./Navbar";
import ProductList from "../features/products/ProductList";
import NotificationPanel from "../components/NotificationPanel";
import type { Product } from "../store/modules/products/product.types";

export default function DashboardClient({ products }: { products: Product[] }) {
  store.dispatch({ type: "products/hydrateProducts", payload: products });

  return (
    <Provider store={store}>
      <div>
        <Navbar />
        <main className="p-6 grid grid-cols-4 gap-6">
          <div className="col-span-3 bg-white p-4 rounded shadow">
            <ProductList />
          </div>
          <div className="col-span-1">
            <NotificationPanel />
          </div>
        </main>
      </div>
    </Provider>
  );
}
