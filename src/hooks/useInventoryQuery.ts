import { useQuery } from "@tanstack/react-query";
import { ChangeType } from "../types";
import { getOrderDetail } from "../api/inventoryHistoryApi";

export const useOrderDetail = (
  orderNumber: string,
  changeType: ChangeType,
  token: string
) => {
  return useQuery({
    queryKey: ["order-detail", orderNumber, changeType, token],
    queryFn: () => getOrderDetail(orderNumber, changeType, token),
    staleTime: 5 * 60 * 1000,
    enabled: !!orderNumber && !!changeType,
  });
};
