import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteOrderImage,
  generateSignedUrl,
  saveImageUrl,
} from "../api/cloudflareApi";
import { OrderImageCategory } from "../types";

// Hook to generate signed URL
export const useGenerateSignedUrl = () => {
  return useMutation({
    mutationFn: ({
      fileName,
      fileType,
    }: {
      fileName: string;
      fileType: string;
    }) => generateSignedUrl(fileName, fileType),
  });
};

export const useSaveImageUrl = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      orderNumber,
      imageUrl,
      category,
    }: {
      orderNumber: string;
      imageUrl: string;
      category: "returnImages" | "insideImages" | "outsideImages";
    }) => saveImageUrl(orderNumber, imageUrl, category),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["inventoryHistoryShops"],
      });
      queryClient.invalidateQueries({
        queryKey: ["order-images"],
      });
    },
  });
};

export const useDeleteOrderImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      orderNumber,
      imageUrl,
      category,
    }: {
      orderNumber: string;
      imageUrl: string;
      category: OrderImageCategory;
    }) => deleteOrderImage(orderNumber, imageUrl, category),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["inventoryHistoryShops"],
      });
      queryClient.invalidateQueries({
        queryKey: ["order-images"],
      });
    },
  });
};
