import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./product.types";
const slice = createSlice({
  name: "products",
  initialState: { list: [] as Product[], loading: false },
  reducers: {
    hydrateProducts(state, action: PayloadAction<Product[]>) {
      state.list = action.payload;
    },
    productLoadRequest(state) {
      state.loading = true;
    },
    productLoadSuccess(state, action: PayloadAction<Product[]>) {
      state.list = action.payload;
      state.loading = false;
    },
    productLoadFailure(state) {
      state.loading = false;
    },
    productAddRequest(state, _) {},
    productEditRequest(state, _) {},
    productRemoveRequest(state, _) {},
    addProduct(state, action: PayloadAction<Product>) {
      state.list.unshift(action.payload);
    },
    updateProduct(state, action: PayloadAction<Product>) {
      const idx = state.list.findIndex((p) => p.id === action.payload.id);
      if (idx >= 0) state.list[idx] = action.payload;
    },
    removeProduct(state, action: PayloadAction<string>) {
      state.list = state.list.filter((p) => p.id !== action.payload);
    },
  },
});
export const {
  hydrateProducts,
  productLoadRequest,
  productLoadSuccess,
  productLoadFailure,
  productAddRequest,
  productEditRequest,
  productRemoveRequest,
  addProduct,
  updateProduct,
  removeProduct,
} = slice.actions;
export default slice.reducer;
