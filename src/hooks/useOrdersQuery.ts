import { useQuery } from "@tanstack/react-query";
import { getOrderImages } from "../api/ordersApi";
import { ChangeType } from "../types";

export const useOrderImages = (orderNumber: string, changeType: ChangeType) => {
  return useQuery({
    queryKey: ["order-images", orderNumber, changeType],
    queryFn: () => getOrderImages(orderNumber, changeType),
    staleTime: 5 * 60 * 1000,
    enabled: !!orderNumber && !!changeType,
    retry: 2,
  });
};
