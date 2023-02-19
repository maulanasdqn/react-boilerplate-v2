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

export interface Detail {
  SalesOrderDetailID: string;
  AutoCreateIssue: boolean;
  AverageCost: number;
  Branch: string;
  Commissionable: boolean;
  Completed: boolean;
  DiscountAmount: number;
  DiscountedUnitPrice: number;
  DiscountPercent: number;
  ExtendedPrice: number;
  FreeItem: boolean;
  InventoryID: string;
  LineDescription: string;
  Description: string;
  LineNbr: number;
  LineType: string;
  ManualDiscount: boolean;
  MarkForPO: boolean;
  OpenQty: number;
  OrderQty: number;
  OvershipThreshold: number;
  QtyOnShipments: number;
  RequestedOn: Date;
  SalespersonID: string;
  ShipOn: Date;
  TaxCategory: string;
  UnbilledAmount: number;
  UndershipThreshold: number;
  UnitCost: number;
  UnitPrice: number;
  TipeStorage: string;
  UOM: string;
  WarehouseID: string;
  LastModifiedDateTime: Date;
}

export interface SalesDetailsResponse {
  CurrencyID: string;
  CustomerID: string;
  Date: Date;
  Description: string;
  Dry: boolean;
  EffectiveDate: Date;
  Frozen: boolean;
  Hold: boolean;
  OrderedQty: number;
  OrderNbr: string;
  OrderTotal: number;
  OrderType: string;
  Status: string;
  VATCode: string;
  DiscountTotal?: number;
  TaxTotal?: number;
  LastSync: Date;
  Details: Detail[];
  Payments: any[];
  LastModifiedDateTime: Date;
}
