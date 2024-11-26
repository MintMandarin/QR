import { SkuHistory } from "./Inventories";

export interface CourierType {
  courierName: string;
  count: number;
}

export interface OrderDetail extends SkuHistory {
  sku: string;
  insideImages?: string[];
  outsideImages?: string[];
  returnImages?: string[];
  skuImage: string;
  shopId: string;
  shopName: string;
  token: string;
}

export type OrderImageCategory =
  | "returnImages"
  | "insideImages"
  | "outsideImages";
