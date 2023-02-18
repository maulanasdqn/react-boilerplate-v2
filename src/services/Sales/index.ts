import ApiService from "@services/Api";
import { MetaTypes } from "@services/types";
import { getErrorMessage } from "@utils/helper";
import { AddSalesTypes } from "./types";

const SalesService = {
  getSalesOrder: async (props: MetaTypes) => {
    const { page, rowCount, start, end, query } = props;
    const requestData = {
      method: "get",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      params: {
        page,
        rowsCount: rowCount,
        start,
        end,
        orderNbr: query,
      },
      url: "/SalesOrderReps",
    };
    try {
      const response = await ApiService.customRequest(requestData);
      return response.data;
    } catch (error) {
      throw getErrorMessage(error);
    }
  },

  addSalesOrder: async (payload: AddSalesTypes) => {
    const {
      CustomerId,
      Description,
      OrderNbr,
      OrderType,
      Date,
      Dry,
      Frozen,
      LocationId,
      Details,
      VATCode,
    } = payload;
    const requestData = {
      method: "put",
      headers: {
        "CF-Cache-Status": "DYNAMIC",
      },
      data: {
        OrderNbr,
        CustomerId,
        Date,
        Dry,
        Frozen,
        OrderType,
        LocationId,
        Description,
        Details,
        VATCode,
      },
      url: "/SalesOrderReps/PutSalesOrder",
    };
    try {
      const res = await ApiService.customRequest(requestData);
      return res.data;
    } catch (error) {
      throw getErrorMessage(error);
    }
  },

  holdSync: async (payload: AddSalesTypes) => {
    const requestData = {
      method: "put",
      headers: {
        "CF-Cache-Status": "DYNAMIC",
      },
      data: payload,
      url: "/SalesOrderReps/PutSalesOrder",
    };
    try {
      const res = await ApiService.customRequest(requestData);
      return res.data;
    } catch (error) {
      throw getErrorMessage(error);
    }
  },

  syncSalesOrder: async () => {
    const requestData = {
      method: "post",
      headers: {
        "CF-Cache-Status": "DYNAMIC",
      },
      url: "/SalesOrderSync/Sync",
    };
    try {
      await ApiService.customRequest(requestData);
      ApiService.setHeader();
    } catch (error) {
      throw getErrorMessage(error);
    }
  },

  getCustomerEmployeeId: async ({ id }: { id: string }) => {
    const requestData = {
      method: "get",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      url: `/CustomerReps/${id}`,
    };
    try {
      const response = await ApiService.customRequest(requestData);
      return response.data;
    } catch (error) {
      throw getErrorMessage(error);
    }
  },

  getCustomer: async (props: MetaTypes) => {
    const { rowCount, page } = props;
    const requestData = {
      method: "get",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      params: {
        page,
        rowsCount: rowCount,
      },
      url: "/CustomerReps/AllCustomer",
    };
    try {
      const response = await ApiService.customRequest(requestData);
      return response.data;
    } catch (error) {
      throw getErrorMessage(error);
    }
  },

  getDetailsSalesOrder: async (props: MetaTypes) => {
    const { query } = props;
    const requestData = {
      method: "get",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      url: `/SalesOrderReps/${query}`,
    };
    try {
      const response = await ApiService.customRequest(requestData);
      return response.data;
    } catch (error) {
      throw getErrorMessage(error);
    }
  },

  getSalesCustomerHistory: async (props: MetaTypes) => {
    const { query, page, rowCount } = props;
    const requestData = {
      method: "get",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      params: {
        page,
        rowsCount: rowCount,
        search: query,
      },
      url: "/SalesOrderReps/CustomerHistory",
    };
    try {
      const response = await ApiService.customRequest(requestData);
      return response.data;
    } catch (error) {
      throw getErrorMessage(error);
    }
  },

  getSalesInventoryUom: async (props: MetaTypes) => {
    const { query } = props;
    const requestData = {
      method: "get",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      params: {
        inventoryID: query,
      },
      url: "/StockItemReps/DropDown/StockItemUOMById",
    };
    try {
      const response = await ApiService.customRequest(requestData);
      return response.data;
    } catch (error) {
      throw getErrorMessage(error);
    }
  },

  getSalesInventoryAvailableShipping: async (props: MetaTypes) => {
    const { query } = props;
    const requestData = {
      method: "get",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      params: {
        inventoryID: query,
      },
      url: "/StockItemReps/DropDown/StockItemAvailableShippingQty",
    };
    try {
      const response = await ApiService.customRequest(requestData);
      return response.data;
    } catch (error) {
      throw getErrorMessage(error);
    }
  },

  getSalesInventoryLookup: async (
    props: MetaTypes
  ): Promise<Array<{ totalAvailablePage: number; record: [] }>> => {
    const { query, page, rowCount, tipeStorage = "" } = props;
    const requestData = {
      method: "get",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      params: {
        page,
        rowsCount: rowCount,
        inventoryID: query,
        tipeStorage,
      },
      url: "/StockItemReps/StockItemPagination",
    };
    try {
      const response = await ApiService.customRequest(requestData);
      return response.data;
    } catch (error) {
      throw getErrorMessage(error);
    }
  },

  getSalesPersonByEmployeeId: async ({
    employeeId,
  }: {
    employeeId: number | string;
  }) => {
    const requestData = {
      method: "get",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      params: {
        id: employeeId,
      },
      url: "/EmployeeReps/DropDown/EmployeeSalesPerson",
    };
    try {
      const response = await ApiService.customRequest(requestData);
      return response.data;
    } catch (error) {
      throw getErrorMessage(error);
    }
  },
};

export default SalesService;
