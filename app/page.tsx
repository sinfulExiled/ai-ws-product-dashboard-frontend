import DashboardClient from "../components/DashboardClient";
import { fetchProducts } from "../lib/productApi";

export default async function Page() {
  const products = await fetchProducts();

  return <DashboardClient products={products} />;
}
