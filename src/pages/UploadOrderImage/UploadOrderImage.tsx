import { Empty, Flex, Form, Spin, theme, Typography } from "antd";
import { useLocation } from "react-router-dom";
import { useOrderDetail } from "../../hooks/useInventoryQuery";
import { ImageUploader } from "../../components";
import { OrderSKUTable } from "./Table/OrderSKUTable";
import { useOrderImages } from "../../hooks/useOrdersQuery";
import { ChangeType, OrderDetailOfHistoryType } from "../../types";
const { Title } = Typography;

export const UploadOrderImage = () => {
  const location = useLocation();
  // Parse query parameters
  const queryParams = new URLSearchParams(location.search);
  const orderNumber = queryParams.get("order");
  const token = queryParams.get("token");
  const type: ChangeType = queryParams.get("type") as ChangeType;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { data: order, isFetching: isOrderDetailLoading } = useOrderDetail(
    orderNumber as string,
    type as ChangeType,
    token as string
  );
  const { data: orderImages, isFetching: isOrderImagesLoading } =
    useOrderImages(orderNumber as string, type);

  return (
    <div>
      <div
        style={{
          marginTop: 24,
          padding: 24,
          minHeight: 380,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        {isOrderDetailLoading || isOrderImagesLoading ? (
          <Flex justify="center" align="center" style={{ minHeight: "50vh" }}>
            {" "}
            <Spin size="large" />
          </Flex>
        ) : !order?.success ? (
          <Flex justify="center" align="center" style={{ minHeight: "50vh" }}>
            <Empty
              description="No order data found"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </Flex>
        ) : (
          <>
            <Title level={4} style={{ marginTop: 0, fontSize: 16 }}>
              {orderNumber}
            </Title>
            <OrderSKUTable data={order?.data as OrderDetailOfHistoryType[]} />
            <Form style={{ marginTop: 16 }} layout="vertical">
              {type === "increase" && (
                <Form.Item label="Return Image">
                  <ImageUploader
                    orderNumber={orderNumber as string}
                    category="returnImages"
                    isUploadFromCameraAvailabel={true}
                    existingImages={orderImages?.data?.returnImages ?? []}
                  />
                </Form.Item>
              )}
              {type === "decrease" && (
                <>
                  <Form.Item label="Inside Image">
                    <ImageUploader
                      orderNumber={orderNumber as string}
                      category="insideImages"
                      isUploadFromCameraAvailabel={true}
                      existingImages={orderImages?.data?.insideImages ?? []}
                    />
                  </Form.Item>
                  <Form.Item label="Outside Image">
                    <ImageUploader
                      orderNumber={orderNumber as string}
                      category="outsideImages"
                      isUploadFromCameraAvailabel={true}
                      existingImages={orderImages?.data?.outsideImages ?? []}
                    />
                  </Form.Item>
                </>
              )}
            </Form>
          </>
        )}
      </div>
    </div>
  );
};
