import Accordion from "@components/Accordion";
import SubLoading from "@components/Loading/SubLoading";
import useIntersectionObserver from "@hooks/Common/useIntersectionObserver";
import useFetchAllInventory from "@hooks/Inventory/useFetchAllInventory";
import useFetchAllInventoryUom from "@hooks/Inventory/useFetchAllInventoryUom";
import useFetchSalesPersonByEmployeeId from "@hooks/Inventory/useFetchSalesPersonByEmployeeId";
import usePaginationSales from "@hooks/Sales/usePaginationSales";
import DetailSales from "@pages/sales/$slug";
import SalesService from "@services/Sales";
import TokenService from "@services/Token";
import { QuerySearch } from "@stores/Common";
import { SalesDetails } from "@stores/Sales";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ChangeEvent, FC, ReactElement, Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useRecoilState, useRecoilValue } from "recoil";
import InventoryContent from "./Content";

const InventoryFetchingData: FC = (): ReactElement => {
  const { getPaginationData: get, setPaginationData: set } =
    usePaginationSales();

  const [getData, setData] = useRecoilState(SalesDetails);

  const { data: getSales } = useFetchSalesPersonByEmployeeId();

  const getQuery = useRecoilValue(QuerySearch);
  const [containerRef, isVisible] = useIntersectionObserver({
    threshold: 0,
    rootMargin: "2px",
    root: null,
  });

  const { fetchNextPage, data } = useInfiniteQuery({
    queryKey: ["infinite-query", getQuery],
    queryFn: async ({ pageParam = 1 }) =>
      await SalesService.getSalesInventoryLookup({
        page: pageParam,
        rowCount: 15,
        query: getQuery,
      }),
    getNextPageParam: () => (get.page as number) + 1,
  });

  useEffect(() => {
    if (isVisible) {
      set({
        page: (get.page as number) + 1,
        rowCount: 15,
      });
      fetchNextPage();
    }
  }, [isVisible]);

  const handleChecked = (event: ChangeEvent<HTMLInputElement>) => {
    const saved = getData;
    let updatedList = [...saved];
    if (event.target.checked) {
      updatedList = [...saved, JSON.parse(event.target.value)];
    } else {
      updatedList.splice(saved.indexOf(JSON.parse(event.target.value)), 1);
    }

    const mapped = updatedList.map((item) => ({
      Branch: item.Branch,
      DiscountAmount: item.DiscountAmount,
      InventoryID: item.InventoryID ? item.InventoryID : "",
      OrderQty: item.OrderQty,
      UOM: item.UOM ? item.UOM : "",
      UnitPrice: item.UnitPrice,
      WarehouseID: item.WarehouseID ? item.WarehouseID : "",
      WarehouseDetails: item.WarehouseDetails,
      TaxCategory: item.TaxCategory ? item.TaxCategory : "",
      Description: item.Description ? item.Description : "",
      TipeStorage: item.TipeStorage,
      SalespersonID: item.SalespersonID,
    }));

    setData(mapped);
  };

  return (
    <ErrorBoundary
      fallback={
        <h1 children={"Telah terjadi error saat memuat data inventory"} />
      }
    >
      <Suspense fallback={"Loading.."}>
        {data?.pages.map((render) =>
          render.map((render) =>
            render.record.map((item, index) => (
              <Accordion
                id={`custom-checkbox-${index}`}
                name={"selected"}
                key={index}
                index={index}
                onChange={handleChecked}
                value={JSON.stringify({
                  ...item,
                  Branch:
                    JSON.parse(TokenService.getUser() as string).branchID || "",
                  DiscountAmount: item.DiscountAmount || 0,
                  OrderQty: item.OrderQty || 0,
                  UOM: item.BaseUOM,
                  UnitPrice: item.UnitPrice || 0,
                  WarehouseID: item.WarehouseDetails[0].WarehouseID || "",
                  TaxCategory: item.TaxCategory || "",
                  LineNbr: item.LineNbr || 0,
                  SalespersonID:
                    (getSales
                      ?.map((x) => x.salespersonID)
                      .join("") as string) || "",
                  TipeStorage: item.TipeStorage || "",
                })}
                title={item.InventoryID + " - " + item.Description}
                withCheckbox={true}
                withButton={false}
              >
                <ErrorBoundary
                  fallback={
                    <h1
                      children={
                        "Telah terjadi error saat memuat data inventory"
                      }
                    />
                  }
                >
                  <Suspense fallback={<SubLoading />}>
                    <InventoryContent
                      {...item}
                      Branch={
                        JSON.parse(TokenService.getUser() as string).branchID ||
                        ""
                      }
                      DiscountAmount={item.DiscountAmount || 0}
                      OrderQty={item.OrderQty || 0}
                      UOM={item.BaseUOM}
                      UnitPrice={item.UnitPrice || 0}
                      WarehouseID={item.WarehouseDetails[0].WarehouseID || ""}
                      TaxCategory={item.TaxCategory || ""}
                      LineNbr={item.LineNbr || 0}
                      SalespersonID={
                        (getSales
                          ?.map((x) => x.salespersonID)
                          .join("") as string) || ""
                      }
                      TipeStorage={item.TipeStorage || ""}
                    />
                  </Suspense>
                </ErrorBoundary>
              </Accordion>
            ))
          )
        )}
      </Suspense>
      <div ref={containerRef}>{getQuery?.length === 0 && "Memuat data..."}</div>
    </ErrorBoundary>
  );
};

export default InventoryFetchingData;
