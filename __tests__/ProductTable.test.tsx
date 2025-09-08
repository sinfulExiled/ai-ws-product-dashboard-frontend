import { render, screen } from "@testing-library/react";
import ProductTable from "../components/ProductTable";
const sample = [{ id:"1", name:"A", description:"", price:1, quantity:2, category:"c" }];
test("renders product row", () => {
  render(<ProductTable products={sample as any} onEdit={()=>{}} onDelete={()=>{}} />);
  expect(screen.getByText("A")).toBeInTheDocument();
  expect(screen.getByText("$1.00")).toBeInTheDocument();
});
