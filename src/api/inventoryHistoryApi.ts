import { ChangeType, OrderDetailOfHistoryType, Response } from "../types";
import axiosInstance from "./axiosInstance";

export const getOrderDetail = async (
  orderNumber: string,
  changeType: ChangeType,
  token: string
): Promise<Response<OrderDetailOfHistoryType[]>> => {
  const { data } = await axiosInstance.get("/order-detail", {
    params: { orderNumber, changeType, token },
  });
  return data;
};
