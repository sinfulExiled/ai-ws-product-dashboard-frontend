"use client";
import { useState } from "react";
import { ProductInput } from "../store/modules/products/product.types";
import { useDispatch } from "react-redux";

export default function ProductModal({
  initial,
  onClose,
}: {
  initial?: any | null;
  onClose: () => void;
}) {
  const dispatch = useDispatch();
  const [form, setForm] = useState<ProductInput>(
    initial ?? {
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      category: "",
    }
  );

  const handleChange = (e: any) =>
    setForm((f) => ({
      ...f,
      [e.target.name]:
        e.target.type === "number" ? Number(e.target.value) : e.target.value,
    }));

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (initial?.id)
      dispatch({
        type: "products/productEditRequest",
        payload: { id: initial.id, ...form },
      });
    else dispatch({ type: "products/productAddRequest", payload: form });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form onSubmit={save} className="bg-white p-6 rounded w-96">
        <h3 className="font-bold mb-4">{initial ? "Edit" : "Add"} Product</h3>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 mb-2"
          placeholder="Name"
        />
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 mb-2"
          placeholder="Description"
        />
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          className="w-full border p-2 mb-2"
          placeholder="Price"
        />
        <input
          name="quantity"
          type="number"
          value={form.quantity}
          onChange={handleChange}
          className="w-full border p-2 mb-2"
          placeholder="Quantity"
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-2 mb-4"
          placeholder="Category"
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 bg-gray-200"
          >
            Cancel
          </button>
          <button type="submit" className="px-3 py-1 bg-blue-600 text-white">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
