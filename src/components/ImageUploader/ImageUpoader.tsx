import React from "react";
import axios from "axios";
import { Upload, message, Modal, Progress, Button, Flex } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import { CameraOutlined, UploadOutlined } from "@ant-design/icons";
import {
  useDeleteOrderImage,
  useGenerateSignedUrl,
  useSaveImageUrl,
} from "../../hooks/useCloudflareQuery";
import { OrderImageCategory, Response } from "../../types";
import "./styles.css";

interface ImageUploaderProps {
  orderNumber: string;
  existingImages?: string[];
  category: OrderImageCategory;
  isUploadFromCameraAvailabel?: boolean;
}

export const ImageUploader = (props: ImageUploaderProps) => {
  const {
    orderNumber,
    existingImages,
    category,
    isUploadFromCameraAvailabel = false,
  } = props;
  const [fileList, setFileList] = React.useState<any[]>(
    existingImages?.map((url, index) => ({
      uid: `${index}`,
      name: `Image ${index + 1}`,
      status: "done",
      url: `${import.meta.env.VITE_R2_IMAGE_PREFIX}${url}`,
    })) ?? []
  );
  React.useEffect(() => {
    setFileList(
      existingImages?.map((url, index) => ({
        uid: `${index}`,
        name: `Image ${index + 1}`,
        status: "done",
        url: `${import.meta.env.VITE_R2_IMAGE_PREFIX}${url}`,
      })) ?? []
    );
  }, [existingImages]);

  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState<string | undefined>(
    undefined
  );

  const { mutateAsync: generateSignedUrl } = useGenerateSignedUrl();
  const { mutateAsync: saveImageUrl } = useSaveImageUrl();
  const { mutateAsync: deleteOrderImage } = useDeleteOrderImage();

  const handleUpload = async (info: UploadChangeParam) => {
    const file = info.file;
    if (!file) {
      message.error("No file selected!");
      return;
    }
    if (info.file.status === "removed") {
      return; // Do nothing if it's a file removal
    }

    try {
      setUploading(true);
      setProgress(0);

      const signedUrl: Response<{ signedUrl: string }> =
        await generateSignedUrl({
          fileName: `${Date.now()}-${file?.name}`,
          fileType: file?.type as string,
        });

      const rawFile = file.originFileObj || file;

      // Upload the file with progress tracking
      await axios.put(signedUrl?.data?.signedUrl as string, rawFile, {
        headers: {
          "Content-Type": rawFile.type,
        },
        onUploadProgress: (event) => {
          const percentCompleted = Math.round(
            (event.loaded * 100) / (event.total as number)
          );
          setProgress(percentCompleted);
        },
      });

      const imageUrl = signedUrl?.data?.signedUrl?.split("?")[0];
      const imageFileName = (imageUrl as string).split("/").pop();

      await saveImageUrl({
        orderNumber,
        imageUrl: imageFileName as string,
        category: category,
      });

      message.success("Image uploaded successfully!");
      setFileList([
        ...fileList,
        {
          uid: info.file.uid,
          name: file.name,
          status: "done",
          url: imageUrl,
        },
      ]);
    } catch (error) {
      message.error("Failed to upload image.");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handlePreview = (file: any) => {
    setPreviewImage(file.url || (file.preview as string));
    setPreviewVisible(true);
  };
  const handleRemove = async (file: any) => {
    try {
      const imageFileName = file.url.split("/").pop(); // Extract filename from URL
      if (!imageFileName) throw new Error("Invalid file name.");

      await deleteOrderImage({
        orderNumber,
        imageUrl: imageFileName,
        category,
      });

      // Update the file list state
      setFileList((prevList) =>
        prevList.filter((item) => item.uid !== file.uid)
      );
      message.success("Image deleted successfully!");
    } catch (error) {
      message.error("Failed to delete image.");
    }
  };
  const handleCameraCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileObj = {
        uid: Date.now().toString(),
        name: file.name,
        status: "done",
        originFileObj: file,
        url: URL.createObjectURL(file), // Temporary URL for preview
      };
      handleUpload({ file: fileObj } as UploadChangeParam);
    }
  };
  return (
    <div>
      <Flex gap={16} align="flex-start">
        <Upload
          multiple
          listType="picture-card"
          fileList={fileList}
          beforeUpload={() => false}
          onChange={(e) => handleUpload(e)}
          onRemove={handleRemove}
          onPreview={handlePreview}
          className="custom-upload"
        >
          {fileList.length >= 10 ? null : (
            <div>
              <UploadOutlined /> Upload
            </div>
          )}
        </Upload>
        {isUploadFromCameraAvailabel && (
          <>
            <Button
              type="primary"
              icon={<CameraOutlined />}
              style={{ marginTop: 16 }}
              onClick={() => document.getElementById(category)?.click()}
            />
            <input
              type="file"
              accept="image/*"
              capture="environment"
              id={category}
              style={{ display: "none" }}
              onChange={(e) => handleCameraCapture(e)}
            />
          </>
        )}
      </Flex>

      {/* Progress Indicator */}
      {uploading && (
        <div style={{ marginTop: 16 }}>
          <Progress percent={progress} />
        </div>
      )}
      <Modal
        open={previewVisible}
        closable={false}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="Preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
};
