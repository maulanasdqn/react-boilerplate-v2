import { InventoryRequestTypes } from "@modules/Sales/CreateForm/Inventory/types";
import { CreateSalesTypes } from "@modules/Sales/CreateForm/types";
import { MetaTypes } from "@services/types";
import { formatDate } from "@utils/helper";
import { atom, selector } from "recoil";

export const SalesListPagination = atom<MetaTypes>({
  key: "sales-list-pagination",
  default: {
    page: 1,
    query: undefined,
    rowCount: 5,
    availablePage: 0,
    start: formatDate(new Date(Date.now())),
    end: formatDate(new Date(Date.now())),
  },
});

export const SalesDetails = atom<InventoryRequestTypes[]>({
  key: "sales-details",
  default: [],
});

export const SalesDetailsPayload = atom<InventoryRequestTypes[]>({
  key: "sales-details-payload",
  default: [],
});

export const SalesCreatePayload = atom<CreateSalesTypes>({
  key: "create-sales-payload",
  default: {
    CustomerId: "",
    OrderNbr: "",
    Description: "",
    Date: "",
    LocationId: "MAIN",
    Dry: false,
    Frozen: false,
    VATCode: "",
    OrderType: "SO",
    Status: "On Hold",
  },
});

export const SalesFinalPayload = selector({
  key: "final-payload",
  get:
    ({ get }) =>
    () => {
      const payload = get(SalesCreatePayload);
      const details = get(SalesDetailsPayload);
      return {
        ...payload,
        Details: details,
      };
    },
});
