import { Image } from "antd";

export interface ImageCellProps {
  imageUrl: string;
  width?: number;
}

export const ImageCell = (props: ImageCellProps) => {
  const { imageUrl, width = 100 } = props;
  return <Image width={width} src={imageUrl} />;
};
