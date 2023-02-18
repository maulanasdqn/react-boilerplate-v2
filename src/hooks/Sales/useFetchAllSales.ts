import { useQuery } from "@tanstack/react-query";
import SalesService from "@services/Sales";
import { MetaTypes } from "@services/types";
import { ListResponseTypes } from "@modules/Sales/List/types";
import usePaginationSales from "./usePaginationSales";

export default (props: MetaTypes) => {
  const { setPaginationData, getPaginationData } = usePaginationSales();
  return useQuery<ListResponseTypes[]>({
    queryKey: ["fetch-all-sales", props],
    queryFn: async () => await SalesService.getSalesOrder(props),
    suspense: true,
    onSuccess(data) {
      setPaginationData({
        ...getPaginationData,
        availablePage: data[0].availablePage,
      });
    },
  });
};
