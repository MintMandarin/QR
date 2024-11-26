import { OrderDetail } from "./OrderReport";

export interface InventoryWithSKU {
  _id: string;
  sku: string;
  vendorSku: string;
  imageUrl: string;
  quantity: number;
  color?: string;
  size?: string;
}

export interface UpdateQunatityPayload {
  skuId: string;
  quantity: number;
  comment?: string;
  orderNumber: string;
  userId: string;
  courier?: string;
  trackingLink?: string;
  trackingNumber?: string;
  shopId?: string;
}
export type UpdateType = "Inc" | "Dec";

export interface IncQuantity
  extends Omit<UpdateQunatityPayload, "skuId" | "userId"> {}

export interface BulkInventoryItem {
  skuId: string;
  quantity: number;
}

export interface OrderData {
  orderNumber: string;
  courier: string;
  trackingLink: string;
  trackingNumber: string;
  quantity: number;
}

export interface BulkInventoryUpdatePayload {
  items: BulkInventoryItem[];
  userId: string;
  poId?: string;
}

export type ChangeType = "decrease" | "increase" | "populated" | "csv";

export interface SkuHistory {
  _id: string;
  skuId: string;
  changeType: ChangeType;
  quantity: number;
  comment: string;
  orderNumber: string;
  courier?: string;
  trackingNumber?: string;
  trackingLink?: string;
  shopId?: string;
  createdAt: string;
  userName: string;
}

export interface SKUHistoryByShop {
  shopName: string;
  shopId: string;
  records: OrderDetail[];
}

export interface InventoryBySkuPayload {
  skuList: string[];
}

export interface InventoryWithSKUQuantity {
  sku: string;
  quantity: number;
  skuId: string;
}

export interface InventoryCSVTableType extends InventoryWithSKUQuantity {
  dbSku: string;
  dbQuantity: number;
}

export interface OrderNumberExistPayload {
  skuId: string;
  orderNumber: string;
  changeType: ChangeType;
}

export interface OrderNumberExistResponse {
  found: boolean;
}
