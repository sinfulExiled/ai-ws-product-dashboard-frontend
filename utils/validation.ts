import { ProductInput } from "../store/modules/products/product.types";

export function validateProduct(product: ProductInput): string[] {
  const errors: string[] = [];

  if (!product.name) errors.push("Name is required");
  if (product.price <= 0) errors.push("Price must be greater than zero");
  if (product.quantity < 0) errors.push("Quantity cannot be negative");
  if (!product.category) errors.push("Category is required");

  return errors;
}
