import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./Product";

interface ProductState {
  data: Product | null;
}

const initialState: ProductState = {
  data: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductData: (state, action: PayloadAction<Product>) => {
      state.data = action.payload;
    },
  },
});

export const { setProductData } = productSlice.actions;
export default productSlice.reducer;
