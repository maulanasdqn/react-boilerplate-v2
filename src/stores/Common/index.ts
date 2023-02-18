import { atom } from "recoil";

export const AccordionTogle = atom<string | number | null | undefined>({
  key: "accordion-togle",
  default: null,
});

export const CustomerHistoryTogle = atom({
  key: "customer-history-togle",
  default: false,
});
