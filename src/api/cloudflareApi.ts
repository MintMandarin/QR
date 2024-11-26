import { OrderImageCategory } from "../types";
import axiosInstance from "./axiosInstance";

// Generate signed URL for upload
export const generateSignedUrl = async (fileName: string, fileType: string) => {
  const { data } = await axiosInstance.post("/r2/generate-signed-url", {
    fileName,
    fileType,
  });
  return data
};

// Save the uploaded image URL to the database
export const saveImageUrl = async (
  orderNumber: string,
  imageUrl: string,
  category: string
) => {
  const { data } = await axiosInstance.post("/r2/save-order-image", {
    orderNumber,
    imageUrl,
    category,
  });
  return data;
};

export const deleteOrderImage = async (
  orderNumber: string,
  imageUrl: string,
  category: OrderImageCategory
) => {
  const { data } = await axiosInstance.delete("/r2/image", {
    data: {
      orderNumber,
      imageUrl,
      category,
    },
  });
  return data;
};