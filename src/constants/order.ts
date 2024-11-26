export enum FulfillmentStatus {
  FULFILLED = "FULFILLED",
  UNFULFILLED = "UNFULFILLED",
}

export enum FinancialStatus {
  PAID = "PAID",
  PENDING = "PENDING",
  VOIDED = "VOIDED",
}

export enum Groupby {
  QUANTITY = 1,
  PARENT_SKU = 2,
}

export const NO_MATCH = "No Match";

export const INVENTORY_POPULATED = "Inventory Populated";
export const INVENTORY_NOT_POPULATED = "Inventory Not Populated";

export enum UpdateQuantityType {
  INCREASE = "Inc",
  DECREASE = "Dec",
}

export enum OrderChangeType {
  INCREASE = "increase",
  DECREASE = "decrease",
}
