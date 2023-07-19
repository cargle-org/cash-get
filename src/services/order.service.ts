import https from "../utils/https";
import { ICreateOrderPayload, ILoginPayLoad, ILoginResponse, IOrder, IResponse } from "./types";

const ORDER_BASE_URL = `/order`;

const createOrder = async (payload: { shopId: string; body: ICreateOrderPayload }): Promise<IResponse<IOrder>> =>
  https.post({
    url: `${ORDER_BASE_URL}/${payload.shopId}`,
    body: JSON.stringify(payload.body),
  });
const getSingleOrder = async (payload: string): Promise<IResponse<IOrder>> =>
  https.get({
    url: `${ORDER_BASE_URL}/${payload}`,
  });

const confirmAgentKey = async (payload: { orderId: string; agentKey: string }): Promise<IResponse<IOrder>> =>
  https.post({
    url: `${ORDER_BASE_URL}/${payload.orderId}/confirmAgent`,
    body: JSON.stringify({ key: payload.agentKey }),
  });

const confirmShopKey = async (payload: { orderId: string; agentKey: string }): Promise<IResponse<IOrder>> =>
  https.post({
    url: `${ORDER_BASE_URL}/${payload.orderId}/confirmShop`,
    body: JSON.stringify({ key: payload.agentKey }),
  });

export const orderApi = {
  createOrder,
  getSingleOrder,
  confirmAgentKey,
  confirmShopKey,
};
