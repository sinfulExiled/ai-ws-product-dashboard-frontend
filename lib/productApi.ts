import { apiRequest } from "./api";
import { Product, ProductInput } from "../store/modules/products/product.types";

export function fetchProducts(): Promise<Product[]> {
  return apiRequest("/products");
}

export function createProduct(payload: ProductInput): Promise<Product> {
  return apiRequest("/products", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateProduct(
  id: string,
  payload: Partial<Product>
): Promise<Product> {
  return apiRequest(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function deleteProduct(id: string): Promise<any> {
  return apiRequest(`/products/${id}`, { method: "DELETE" });
}
