import { Image } from "antd";

export interface MultiImageCellProps {
  imageUrls: string[];
}

export const MultiImageCell = (props: MultiImageCellProps) => {
  const { imageUrls } = props;
  return (
    <Image.PreviewGroup>
      {imageUrls.map((url, index) => (
        <div key={index} style={{ display: "inline-block", marginRight: 8 }}>
          <Image width={50} src={url} height={50}/>
        </div>
      ))}
    </Image.PreviewGroup>
  );
};
