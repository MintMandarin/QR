import { Table } from "antd";
import { OrderDetailOfHistoryType } from "../../../types";
import { columns } from "./columns";

export interface OrderSKUTableProps {
  data: OrderDetailOfHistoryType[];
}

export const OrderSKUTable = (props: OrderSKUTableProps) => {
  const { data } = props;
  return (
    <div>
      <Table
        columns={columns()}
        scroll={{ x: true }}
        dataSource={data}
        pagination={false}
        bordered
        className="table-header"
      />
    </div>
  );
};
