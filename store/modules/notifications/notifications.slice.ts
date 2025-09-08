import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Notification {
  id: string;
  message: string;
  type: "info" | "warning" | "ai_insight";
  timestamp: number;
  productId?: string;
  read?: boolean;
}

const slice = createSlice({
  name: "notifications",
  initialState: { list: [] as Notification[], lowStockIds: [] as string[] },
  reducers: {
    addNotification(state, action: PayloadAction<Notification>) {
      state.list.unshift(action.payload);
      if (
        action.payload.type === "warning" &&
        action.payload.productId &&
        !state.lowStockIds.includes(action.payload.productId)
      )
        state.lowStockIds.push(action.payload.productId);
    },
    clearLowStockHighlight(state, action: PayloadAction<string>) {
      state.lowStockIds = state.lowStockIds.filter(
        (id) => id !== action.payload
      );
    },
    markRead(state, action: PayloadAction<string>) {
      const n = state.list.find((x) => x.id === action.payload);
      if (n) n.read = true;
    },
  },
});

export const { addNotification, clearLowStockHighlight, markRead } =
  slice.actions;
export default slice.reducer;
