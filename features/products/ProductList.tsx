"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../../store";
import ProductTable from "../../components/ProductTable";
import ProductModal from "../../components/ProductModal";
import { productLoadRequest } from "../../store/modules/products/products.slice";

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((s: RootState) => s.products.list);
  const loading = useSelector((s: RootState) => s.products.loading);

  const [editing, setEditing] = useState<any | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(productLoadRequest());
  }, [dispatch]);

  const onHandleDelete = (id: string) => {
    if (confirm("Are you sure to delete this product?")) {
      dispatch({ type: "products/productRemoveRequest", payload: id });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Products</h2>
        <div>
          <button
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add product
          </button>
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <ProductTable
          products={products}
          onEdit={(p) => {
            setEditing(p);
            setOpen(true);
          }}
          onDelete={onHandleDelete}
        />
      )}

      {open && (
        <ProductModal initial={editing} onClose={() => setOpen(false)} />
      )}
    </div>
  );
}
