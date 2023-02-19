import { useQuery } from "@tanstack/react-query";
import SalesService from "@services/Sales";
import { MetaTypes } from "@services/types";
import usePaginationSales from "@hooks/Sales/usePaginationSales";

export default (props: MetaTypes) => {
  const { setPaginationData, getPaginationData } = usePaginationSales();
  return useQuery({
    queryKey: ["fetch-all-inventory", props],
    queryFn: async () => await SalesService.getSalesInventoryLookup(props),
    onSuccess(data) {
      setPaginationData({
        ...getPaginationData,
        availablePage: data.map((x) => x.totalAvailablePage)[0],
      });
    },
  });
};
