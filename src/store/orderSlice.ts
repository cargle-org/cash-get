import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IOrderListItem, orderStatusEnum } from "../services/types";

export const orderSlice = createSlice({
  name: "orders",
  initialState: {
    openOrders: [],
    closedOrders: [],
    activeOrders: [],
  } as { openOrders: IOrderListItem[]; closedOrders: IOrderListItem[]; activeOrders: IOrderListItem[] },
  reducers: {
    getOrders: (state, payload: PayloadAction<{ openOrders: IOrderListItem[]; closedOrders: IOrderListItem[]; activeOrders: IOrderListItem[] }>) => {
      state.activeOrders = payload.payload.activeOrders;
      state.closedOrders = payload.payload.closedOrders;
      state.openOrders = payload.payload.openOrders;
    },
  },
});

export const { getOrders } = orderSlice.actions;
