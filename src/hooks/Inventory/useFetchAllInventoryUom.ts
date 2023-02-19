import { useQuery } from "@tanstack/react-query";
import SalesService from "@services/Sales";
import { MetaTypes } from "@services/types";
import { InventoryUomTypes } from "@modules/Sales/CreateForm/Inventory/types";

export default (props: MetaTypes) =>
  useQuery<InventoryUomTypes[]>({
    queryKey: ["fetch-all-inventory-uom", props],
    queryFn: async () => await SalesService.getSalesInventoryUom(props),
  });
