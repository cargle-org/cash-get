export interface IResponse<D> {
  data?: D;
  status: boolean;
  message: string;
}

export interface ILoginPayLoad {
  email: string;
  password: string;
  role: UserEnum;
}

export interface ILoginResponse {
  user: IUser;
  accessToken: string;
}

export enum UserEnum {
  SHOP = "SHOP",
  AGENT = "AGENT",
}

export enum OrderStatusEnum {
  CREATED = "CREATED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  NOT_HANDLED = "NOT_HANDLED",
}

export enum CollectionProgressStatusEnum {
  STARTED = "STARTED",
  COMPLETED = "COMPLETED",
}

export enum CollectionStatusEnum {
  PARTIAL = "PARTIAL",
  FULL = "FULL",
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  address: string;
  password: string;
  phoneNo: string;
  role: UserEnum;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrder {
  id: string;
  address: string;
  amount: number;
  contactName: string;
  contactNumber: string;
  extraInfo: string;
  shop: IUser | string;
  orderCollections: IOrderCollection[];
  deliveryPeriod: Date;
  status: OrderStatusEnum;
  remainingAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderCollection {
  id: string;
  amount: number;
  agent: IUser;
  order: IOrder;
  deliveryPeriod: Date;
  collectionStatus: CollectionStatusEnum;
  collectionProgressStatus: CollectionProgressStatusEnum;
  shopKey: string;
  shopConfirmed: boolean;
  agentKey: string;
  agentConfirmed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateOrderPayload {
  amount: number;
  address: string;
  contactName: string;
  contactNumber: string;
  extraInfo: string;
}

export interface IOrderListItem {
  id: string;
  amount: number;
  status: OrderStatusEnum;
  remainingAmount: number;
  shopId: string;
  deliveryPeriod: string;
}
export interface IOrderCollectionListItem {
  agentId: string;
  agentName: string;
  agentNo: string;
  amount: number;
  collectionProgressStatus: CollectionProgressStatusEnum;
  collectionStatus: CollectionStatusEnum;
  deliveryPeriod: string;
  id: string;
  shopId: string;
  shopName: string;
  shopAddress: string;
  orderId: string;
}
