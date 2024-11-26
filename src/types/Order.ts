export interface OrderPayload {
  orderNumber: string;
  shopId: string;
}

export interface OrderBySkuPayload {
  skuArr: string[];
  dateRange: any;
  fulfillementStatus: number;
  shopIds: string[];
}

export type Order = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  createdAt: string;
  cancelledAt: string | null;
  app: {
    id: string;
    name: string;
  };
  customer: {
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    phone: string | null;
  };
  shippingAddress: {
    address1: string | null;
    address2: string | null;
    city: string;
    province: string;
    country: string;
    zip: string | null;
    phone: string | null;
  };
  displayFulfillmentStatus: string;
  lineItems: {
    edges: {
      node: {
        id: string;
        title: string;
        quantity: number;
        sku: string;
        variant: {
          id: string;
          title: string;
          displayName: string;
          sku: string;
          selectedOptions: {
            name: string;
            value: string;
          }[];
        };
        image: {
          id: string;
          originalSrc: string;
        };
        fulfillmentStatus: string;
        fulfillmentService: {
          trackingSupport: boolean;
          serviceName: string;
          id: string;
          inventoryManagement: boolean;
          type: string;
        };
        variantTitle: string;
        requiresShipping: boolean;
      };
    }[];
  };
  referralCode: string | null;
  refunds: {
    createdAt: string;
    return: {
      name: string;
      id: string;
      status: string;
      totalQuantity: number;
    };
  }[];
  paymentGatewayNames: string[];
  displayFinancialStatus: string;
  closedAt: string | null;
  closed: boolean;
  fulfillments: {
    trackingInfo: {
      company: string;
      number: string;
      url: string;
    }[];
  }[];
};

export interface OrdersWithtrackingInfoType {
  orderNumber: string;
  trackingInfo: TrackingInfo;
}
export interface TrackingInfo {
  company: string;
  number: string;
  url: string;
}

export interface PdfTableData {
  orderNumber?: string;
  sku: string;
  skuImage: string;
  quantity: number;
  courier: string;
  trackingNumber: string;
  comment: string;
  date: any;
  rowSpan?: number;
}

export interface TableColumn {
  dataKey: string;
}

export interface TableRow {
  [key: string]: any;
}

export interface Cell {
  rowSpan: number;
  content: any;
}

export interface OrderDetailOfHistoryType {
  sku: string;
  imageUrl: string;
  shopId: string;
  shopName: string;
}

export interface OrderImages {
  returnImages?: string[];
  insideImages?: string[];
  outsideImages?: string[];
}
