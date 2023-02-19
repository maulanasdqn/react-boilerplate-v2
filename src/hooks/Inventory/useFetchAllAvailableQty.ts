import { useQuery } from "@tanstack/react-query";
import SalesService from "@services/Sales";
import { InventoryAvailableQty } from "@modules/Sales/CreateForm/Inventory/types";

export default (query: string) =>
  useQuery<InventoryAvailableQty[]>({
    queryKey: ["fetch-all-available-qty", query],
    queryFn: async () =>
      await SalesService.getSalesInventoryAvailableShipping({
        query,
      }),
  });
