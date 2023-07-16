import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IOrderListItem, orderStatusEnum } from "../services/types";

export const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
  } as { orders: IOrderListItem[] },
  reducers: {
    getOrders: (state, payload: PayloadAction<IOrderListItem[]>) => {
      state.orders = payload.payload;
    },
  },
});

export const { getOrders } = orderSlice.actions;
