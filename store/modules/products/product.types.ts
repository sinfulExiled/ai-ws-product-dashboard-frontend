export interface Product {
  id: string;
  name: string;
  description?: string|"";
  price: number;
  quantity: number;
  category: string;
  createdAt?: string;
}
export type ProductInput = Omit<Product, "id" | "createdAt">;
