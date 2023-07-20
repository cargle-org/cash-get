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

export enum orderStatusEnum {
  CREATED = "CREATED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
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
  agent: IUser | string;
  shop: IUser | string;
  agentConfirmed: boolean;
  agentKey: string;
  shopConfirmed: boolean;
  deliveryPeriod: Date;
  shopKey: string;
  status: orderStatusEnum;
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
  amount: string;
  status: orderStatusEnum;
  agentName: string;
  agentId: string;
  agentNo: string;
  deliveryPeriod: string;
}
