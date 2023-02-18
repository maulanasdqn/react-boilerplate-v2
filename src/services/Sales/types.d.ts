export type AddSalesTypes = {
  OrderNbr: string;
  CustomerId: string;
  Date: string | Date | number;
  Dry: boolean;
  Frozen: boolean;
  Description: string;
  LocationId: string;
  OrderType: string;
  Status: string;
  Details?: Array<AddDetailsSalesTypes>;
  VATCode?: string;
  Hold?: boolean;
};
