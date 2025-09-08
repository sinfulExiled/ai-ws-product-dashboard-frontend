import { render, screen } from "@testing-library/react";
import ProductModal from "../components/ProductModal";
test("renders product modal save", () => {
  render(<ProductModal onClose={() => {}} />);
  expect(
    screen.getByText("Save") || screen.getByText("Add Product")
  ).toBeTruthy();
});
