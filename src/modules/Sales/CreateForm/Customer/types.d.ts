export type CustomerRecordTypes = {
  OrderNbr: string;
  WarehouseID: string;
  SalespersonID: string;
  Details: Array<{
    LineDescription: string;
    UnitPrice: number;
    UnbilledAmount: number;
    UOM: string;
  }>;
  LastModifiedDateTime: string | number | Date;
  OrderedQty: number;
};

export type CustomerResponseTypes = {
  totalCountData: number;
  availablePage: number;
  record: CustomerRecordTypes[];
};
