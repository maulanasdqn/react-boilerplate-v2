import { useMutation } from "@tanstack/react-query";
import SalesService from "@services/Sales";
import { CreateSalesTypes } from "@modules/Sales/CreateForm/types";

export default () =>
  useMutation({
    mutationKey: ["create-sales-order"],
    mutationFn: async (payload: CreateSalesTypes) =>
      await SalesService.addSalesOrder(payload),
  });
