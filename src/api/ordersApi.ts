import { ChangeType, OrderImages, Response } from "../types";
import axiosInstance from "./axiosInstance";

// get order images
export const getOrderImages = async (
  orderNumber: string,
  changeType: ChangeType
): Promise<Response<OrderImages>> => {
  const { data } = await axiosInstance.get("/orders/images", {
    params: { orderNumber, changeType },
  });
  return data;
};
