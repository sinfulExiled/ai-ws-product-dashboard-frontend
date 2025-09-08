import React from "react";
import ProductTable from "../components/ProductTable";
import { Product } from "../store/modules/products/product.types";

export default { title: "ProductTable", component: ProductTable };

const sample: Product[] = [
  {
    id: "1",
    name: "Widget",
    description: "",
    price: 9.99,
    quantity: 3,
    category: "misc",
  },
  {
    id: "2",
    name: "Gadget",
    description: "",
    price: 19.99,
    quantity: 12,
    category: "tools",
  },
];

export const Default = () => (
  <ProductTable products={sample} onEdit={() => {}} onDelete={() => {}} />
);
