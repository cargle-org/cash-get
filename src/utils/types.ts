export interface IDelete {
  url: string;
  body?: any;
}

export interface IPost extends IDelete {
  body?: string;
}

export type IPatch = IPost;

export type IPut = IPost;

export interface IGet extends IDelete {
  query?: Record<string, any>;
}

export interface IResponse<D> {
  data?: D;
  code?: number;
  message?: string;
}

export enum CollectionStatusEnum {
  PARTIAL = "PARTIAL",
  FULL = "FULL",
}
