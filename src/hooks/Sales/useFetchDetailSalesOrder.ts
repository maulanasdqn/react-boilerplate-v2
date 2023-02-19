import { useQuery } from "@tanstack/react-query";
import SalesService from "@services/Sales";
import { MetaTypes } from "@services/types";
import { SalesDetailsResponse } from "@services/Sales/types";

export default (id: string) => {
  return useQuery<SalesDetailsResponse>({
    queryKey: ["fetch-sales-detail", id],
    queryFn: async () => await SalesService.getDetailsSalesOrder(id),
  });
};
