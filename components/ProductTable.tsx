"use client";
import { Product } from "../store/modules/products/product.types";
import { formatCurrency } from "../utils/format";
import { LOW_STOCK_THRESHOLD } from "../constants/api";
interface Props {
  products: Product[];
  onEdit: (p: Product) => void;
  onDelete: (id: string) => void;
}
export default function ProductTable({ products, onEdit, onDelete }: Props) {
  return (
    <table className="min-w-full border bg-white shadow rounded-lg overflow-hidden">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 text-left">Name</th>
          <th className="px-4 py-2 text-left">Price</th>
          <th className="px-4 py-2 text-left">Quantity</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr
            key={p.id}
            className={`border-t ${
              p.quantity <= LOW_STOCK_THRESHOLD ? "bg-yellow-50" : ""
            }`}
          >
            <td className="px-4 py-2">{p.name}</td>
            <td className="px-4 py-2">{formatCurrency(p.price)}</td>
            <td className="px-4 py-2">{p.quantity}</td>
            <td className="px-4 py-2 flex gap-2">
              <button
                onClick={() => onEdit(p)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(p.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
