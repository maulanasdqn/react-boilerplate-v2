import { useQuery } from "@tanstack/react-query";
import SalesService from "@services/Sales";
import TokenService from "@services/Token";
import { InventorySalesPersonTypes } from "@modules/Sales/CreateForm/Inventory/types";

export default () => {
  const user = JSON.parse(TokenService.getUser() as string);
  return useQuery<InventorySalesPersonTypes[]>({
    queryKey: ["fetch-sales-person"],
    queryFn: async () =>
      await SalesService.getSalesPersonByEmployeeId(user.employeeID),
  });
};
