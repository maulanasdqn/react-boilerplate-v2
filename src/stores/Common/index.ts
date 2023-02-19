import { atom } from "recoil";

export const AccordionTogle = atom<string | number | null | undefined>({
  key: "accordion-togle",
  default: null,
});

export const CustomerHistoryTogle = atom({
  key: "customer-history-togle",
  default: false,
});

export const InventoryTogle = atom({
  key: "inventory-history-togle",
  default: false,
});

export const QuerySearch = atom({
  key: "query-search",
  default: "",
});

export const ListIndex = atom<number[]>({
  key: "list-index-removeble",
  default: [],
});

export const RemoveStatus = atom({
  key: "remove-status",
  default: false,
});

export const OrderNbr = atom({
  key: "order-number",
  default: "",
});
