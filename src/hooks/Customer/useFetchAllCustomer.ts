import { useQuery } from "@tanstack/react-query";
import SalesService from "@services/Sales";
import { MetaTypes } from "@services/types";
import { CustomerResponseTypes } from "@modules/Sales/CreateForm/Customer/types";
import usePaginationSales from "@hooks/Sales/usePaginationSales";

export default (props: MetaTypes) => {
  const { setPaginationData, getPaginationData } = usePaginationSales();
  return useQuery<CustomerResponseTypes[]>({
    queryKey: ["fetch-all-customer-history", props],
    queryFn: async () => await SalesService.getSalesCustomerHistory(props),
    onSuccess(data) {
      setPaginationData({
        ...getPaginationData,
        availablePage: data[0].availablePage,
      });
    },
  });
};
