import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IOrderListItem } from "../services/types";

export const orderSlice = createSlice({
  name: "orders",
  initialState: {
    shopOrders: {
      openOrders: [],
      closedOrders: [],
      activeOrders: [],
    },
    agentOrders: {
      openOrders: [],
    },
  } as {
    shopOrders: { openOrders: IOrderListItem[]; closedOrders: IOrderListItem[]; activeOrders: IOrderListItem[] };
    agentOrders: {
      openOrders: IOrderListItem[];
    };
  },
  reducers: {
    getShopOrders: (
      state,
      payload: PayloadAction<{ openOrders: IOrderListItem[]; closedOrders: IOrderListItem[]; activeOrders: IOrderListItem[] }>
    ) => {
      state.shopOrders = {
        activeOrders: payload.payload.activeOrders,
        closedOrders: payload.payload.closedOrders,
        openOrders: payload.payload.openOrders,
      };
    },
    getAgentOrders: (state, payload: PayloadAction<{ openOrders: IOrderListItem[] }>) => {
      state.agentOrders = {
        openOrders: payload.payload.openOrders,
      };
    },
  },
});

export const { getShopOrders, getAgentOrders } = orderSlice.actions;
