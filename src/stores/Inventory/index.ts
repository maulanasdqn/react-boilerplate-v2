import Inventory from "@modules/Sales/CreateForm/Inventory";
import { InventoryRecordTypes } from "@modules/Sales/CreateForm/Inventory/types";
import SalesService from "@services/Sales";
import { SalesListPagination } from "@stores/Sales";
import { selector } from "recoil";

export const FetchInventory = selector({
  key: "fetch-inventory",
  get: async ({ get }) => {
    const res = await SalesService.getSalesInventoryLookup({
      ...get(SalesListPagination),
    });
    const resAvailable = res.map((inventory) => inventory.totalAvailablePage);
    const resData = res.map((inventory) => inventory.record);

    return {
      resAvailable: resAvailable[0],
      resData: resData[0],
    };
  },
});
