import { MetaTypes } from "@services/types";
import { formatDate } from "@utils/helper";
import { atom } from "recoil";

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
