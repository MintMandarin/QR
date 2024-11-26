import { ImageCell } from "../../../cells";

export const columns = () => {
  let columns = [
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
    },
    {
      title: "SKU Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (url: string) => {
        return <ImageCell imageUrl={url} />;
      },
    },
    {
      title: "Shop Name",
      dataIndex: "shopName",
      key: "shopName",
    },
  ];

  return columns;
};
