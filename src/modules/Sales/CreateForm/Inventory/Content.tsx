import useFetchAllAvailableQty from "@hooks/Inventory/useFetchAllAvailableQty";
import useFetchAllInventoryUom from "@hooks/Inventory/useFetchAllInventoryUom";
import useFetchSalesPersonByEmployeeId from "@hooks/Inventory/useFetchSalesPersonByEmployeeId";
import { SalesDetails } from "@stores/Sales";
import { ChangeEventHandler, FC, ReactElement, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilCallback, useRecoilState } from "recoil";
import { InventoryRecordTypes, InventoryRequestTypes } from "./types";

const InventoryContent: FC<InventoryRecordTypes> = (props): ReactElement => {
  const { data: resUom } = useFetchAllInventoryUom({
    query: props.InventoryID,
  });

  const { data: resAvailableQty } = useFetchAllAvailableQty(props.InventoryID);

  const { data: resSalesPerson } = useFetchSalesPersonByEmployeeId();

  const [get, set] = useRecoilState(SalesDetails);

  const { register, reset, watch, setValue, handleSubmit, getValues } =
    useForm<InventoryRequestTypes>({
      defaultValues: {
        ...props,
      },
    });

  const handleQtySelected = useRecoilCallback(
    ({ set }): ChangeEventHandler<HTMLInputElement> =>
      (event) => {
        const newItem = get?.map((item) => {
          if (item.InventoryID === props.InventoryID) {
            return { ...item, OrderQty: parseInt(event.target.value) };
          }
          return item;
        });
        set(SalesDetails, newItem);
      }
  );

  const handleWarehouseSelected = useRecoilCallback(
    ({ set }): ChangeEventHandler<HTMLSelectElement> =>
      (event) => {
        const newItem = get?.map((item) => {
          if (item.InventoryID === props.InventoryID) {
            return { ...item, WarehouseID: event.target.value };
          }
          return item;
        });
        set(SalesDetails, newItem);
      }
  );

  const handleUomSelected = useRecoilCallback(
    ({ set }): ChangeEventHandler<HTMLSelectElement> =>
      (event) => {
        const newItem = get?.map((item) => {
          if (item.InventoryID === props.InventoryID) {
            return { ...item, UOM: event.target.value };
          }
          return item;
        });
        set(SalesDetails, newItem);
      }
  );

  const handleSalesPersonSelected = useRecoilCallback(
    ({ set }): ChangeEventHandler<HTMLSelectElement> =>
      (event) => {
        const newItem = get?.map((item) => {
          if (item.InventoryID === props.InventoryID) {
            return { ...item, SalespersonID: event.target.value };
          }
          return item;
        });
        set(SalesDetails, newItem);
      }
  );

  useEffect(() => {
    if (
      get.map((x) => x.InventoryID === props.InventoryID) &&
      get.length !== 0
    ) {
      get?.map((item) => {
        if (item.InventoryID === props.InventoryID) {
          reset(item);
        }
      });
    }
  }, [get]);

  return (
    <form className="flex text-[14px] gap-y-2 flex-col border-b-1 border-gray-200 p-3 w-full h-auto">
      <div className="flex justify-between w-full border-b-1">
        <h1>Qty Selected</h1>
        <input
          {...register("OrderQty")}
          onChange={handleQtySelected}
          name="OrderQty"
          className="w-[30px] text-right"
          type="number"
        />
      </div>
      <div className="flex justify-between w-full border-b-1">
        <h1>Warehouse</h1>
        <select
          {...register("WarehouseID")}
          onChange={handleWarehouseSelected}
          name="WarehouseID"
          id="WarehouseID"
        >
          {props.WarehouseDetails.map((warehouse, index) => (
            <option key={index} value={warehouse.WarehouseID}>
              {warehouse.WarehouseID}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between w-full border-b-1">
        <h1>Available For Shipping</h1>
        <h1>
          {resAvailableQty
            ?.filter((x) => x.warehouse === watch("WarehouseID"))
            .map((x) => x.availableShippingQty)}
        </h1>
      </div>
      <div className="flex justify-between w-full border-b-1">
        <h1>Avg. Qty (Last 3)</h1>
        <h1>{props.AvgThreeMonthsQty || 0}</h1>
      </div>
      <div className="flex justify-between w-full border-b-1">
        <h1>UOM</h1>
        <select
          {...register("UOM")}
          onChange={handleUomSelected}
          name="UOM"
          id="UOM"
        >
          {resUom?.map((item, index) => (
            <option key={index} value={item.uom}>
              {item.uom}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between w-full border-b-1 truncate">
        <h1>Sales Person ID</h1>
        <select
          {...register("SalespersonID")}
          onChange={handleSalesPersonSelected}
          name="SalespersonID"
          id="SalespersonID"
          className="w-1/2"
        >
          {resSalesPerson?.map((item, index) => (
            <option key={index} value={item.salespersonID}>
              {item.employeeName}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between w-full border-b-1">
        <h1>Sales Unit</h1>
        <h1>{0}</h1>
      </div>
    </form>
  );
};

export default InventoryContent;
