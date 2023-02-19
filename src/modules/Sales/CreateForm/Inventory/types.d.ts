export type InventoryRequestTypes = {
  Description?: string;
  Branch: string;
  DiscountAmount: number;
  InventoryID: string;
  OrderQty: number;
  UOM: string;
  UnitPrice: number;
  WarehouseID: string;
  TaxCategory: string;
  LineNbr?: number;
  SalespersonID: string;
  WarehouseDetails?: Array<{
    LastModifiedDateTime: string;
    QtyOnHand: number;
    WarehouseID: string;
  }>;
  TipeStorage?: string;
};

export type InventoryResponseTypes = {
  totalCountData: number;
  totalAvailablePage: number;
  record: InventoryRecordTypes[];
};

export type InventoryRecordTypes = {
  AvgThreeMonthsQty: number;
  WarehouseDetails: Array<{
    LastModifiedDateTime: string;
    QtyOnHand: number;
    WarehouseID: string;
  }>;
  BaseUOM: string;
  DefaultWarehouseID: string;
  tipeStorage: string;
  Description: string;
  AutoCreateIssue: boolean;
  AverageCost: number;
  Branch: string;
  Commissionable: boolean;
  Completed: boolean;
  DiscountAmount: number;
  DiscountPercent: number;
  DiscountedUnitPrice: number;
  ExtendedPrice: number;
  FreeItem: boolean;
  InventoryID: string;
  LastModifiedDateTime: string;
  LineDescription: string;
  LineNbr: number;
  LineType: string;
  ManualDiscount: boolean;
  MarkForPO: boolean;
  OpenQty: number;
  OrderQty: number;
  OvershipThreshold: number;
  QtyOnShipments: number;
  RequestedOn: string;
  SalesOrderDetailID: string;
  SalespersonID: string;
  ShipOn: string;
  TaxCategory: string;
  UOM: string;
  UnbilledAmount: number;
  UndershipThreshold: number;
  UnitCost: number;
  UnitPrice: number;
  WarehouseID: string;
  TipeStorage: string;
  Inputs: InventoryRequestTypes;
};

export type InventoryUomTypes = {
  inventoryID: string;
  uom: string;
};

export type InventorySalesPersonTypes = {
  employeeID: string;
  employeeName: string;
  salespersonID: string;
};

export type InventoryAvailableQty = {
  availableShippingQty: number;
  inventoryID: string;
  warehouse: string;
};
