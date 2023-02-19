import { InventoryRequestTypes } from "./Inventory/types";

export type CreateSalesTypes = {
  OrderNbr: string;
  CustomerId: string;
  Date: string | Date | number;
  Dry: boolean;
  Frozen: boolean;
  Description: string;
  LocationId: string;
  OrderType: string;
  Status: string;
  Details?: Array<InventoryRequestTypes>;
  VATCode?: string;
  Hold?: boolean;
};
