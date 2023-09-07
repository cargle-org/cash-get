import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IOrderCollectionListItem } from "../services/types";

export const orderCollectionSlice = createSlice({
  name: "orderCollections",
  initialState: {
    closedOrderCollections: [],
    activeOrderCollections: [],
  } as {
    closedOrderCollections: IOrderCollectionListItem[];
    activeOrderCollections: IOrderCollectionListItem[];
  },
  reducers: {
    getOrderCollections: (
      state,
      payload: PayloadAction<{ closedOrderCollections: IOrderCollectionListItem[]; activeOrderCollections: IOrderCollectionListItem[] }>
    ) => {
      state.activeOrderCollections = payload.payload.activeOrderCollections;
      state.closedOrderCollections = payload.payload.closedOrderCollections;
    },
  },
});

export const { getOrderCollections } = orderCollectionSlice.actions;
