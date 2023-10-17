import https from "../utils/https";
import { CollectionStatusEnum } from "../utils/types";
import { ICreateOrderPayload, ILoginPayLoad, ILoginResponse, IOrder, IOrderCollection, IResponse } from "./types";

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

const getSingleOrderCollection = async (payload: string): Promise<IResponse<IOrderCollection>> =>
  https.get({
    url: `${ORDER_BASE_URL}/orderCollection/${payload}`,
  });

const acceptOrder = async (payload: {
  orderId: string;
  agentId: string;
  useSpikk: boolean;
  collectionStatus: CollectionStatusEnum;
  amount: number;
}): Promise<IResponse<IOrder>> =>
  https.post({
    url: `${ORDER_BASE_URL}/${payload.orderId}/acceptOrder`,
    body: JSON.stringify({ ...payload, agentId: `${payload.agentId}` }),
  });

const confirmAgentKey = async (payload: { orderCollectionId: string; agentKey: string }): Promise<IResponse<IOrderCollection>> =>
  https.post({
    url: `${ORDER_BASE_URL}/${payload.orderCollectionId}/confirmAgent`,
    body: JSON.stringify({ key: payload.agentKey }),
  });

const confirmShopKey = async (payload: { orderCollectionId: string; shopKey: string }): Promise<IResponse<IOrderCollection>> =>
  https.post({
    url: `${ORDER_BASE_URL}/${payload.orderCollectionId}/confirmShop`,
    body: JSON.stringify({ key: payload.shopKey }),
  });

const deleteOrder = async (payload: { orderId: string }): Promise<IResponse<null>> =>
  https.delete({
    url: `${ORDER_BASE_URL}/${payload.orderId}`,
  });

export const orderApi = {
  acceptOrder,
  createOrder,
  getSingleOrder,
  getSingleOrderCollection,
  confirmAgentKey,
  confirmShopKey,
  deleteOrder,
};
