import useFetchAllInventoryUom from "@hooks/Inventory/useFetchAllInventoryUom";
import useFetchSalesPersonByEmployeeId from "@hooks/Inventory/useFetchSalesPersonByEmployeeId";
import { InventoryRequestTypes } from "@modules/Sales/CreateForm/Inventory/types";
import { SalesDetails, SalesDetailsPayload } from "@stores/Sales";
import { FC, ReactElement, ChangeEventHandler } from "react";
import { useRecoilTransaction_UNSTABLE as useRecoilTransaction } from "recoil";

const DetailsContent: FC<InventoryRequestTypes> = (props): ReactElement => {
  const InventoryID = props.InventoryID;

  const { data: getDataUom } = useFetchAllInventoryUom({ query: InventoryID });
  const { data: getDataSales } = useFetchSalesPersonByEmployeeId();

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const rupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const handleQtySelected = useRecoilTransaction(
    ({ get, set }): ChangeEventHandler<HTMLInputElement> =>
      (event) => {
        const mutateDetails = get(SalesDetailsPayload);
        const newItem = mutateDetails?.map((item) => {
          if (item.InventoryID === InventoryID) {
            return { ...item, OrderQty: parseInt(event.target.value) };
          }
          return item;
        });

        set(SalesDetailsPayload, newItem);
      }
  );

  const handleUomSelected = useRecoilTransaction(
    ({ get, set }): ChangeEventHandler<HTMLSelectElement> =>
      (event) => {
        const mutateDetails = get(SalesDetailsPayload);
        const newItem = mutateDetails?.map((item) => {
          if (item.InventoryID === InventoryID) {
            return { ...item, UOM: event.target.value };
          }
          return item;
        });

        set(SalesDetailsPayload, newItem);
      }
  );

  const handleWarehouseSelected = useRecoilTransaction(
    ({ get, set }): ChangeEventHandler<HTMLSelectElement> =>
      (event) => {
        const mutateDetails = get(SalesDetailsPayload);
        const newItem = mutateDetails?.map((item) => {
          if (item.InventoryID === InventoryID) {
            return { ...item, WarehouseID: event.target.value };
          }
          return item;
        });

        set(SalesDetailsPayload, newItem);
      }
  );

  const handleSalesPersonSelected = useRecoilTransaction(
    ({ get, set }): ChangeEventHandler<HTMLSelectElement> =>
      (event) => {
        const mutateDetails = get(SalesDetailsPayload);
        const newItem = mutateDetails?.map((item) => {
          if (item.InventoryID === InventoryID) {
            return { ...item, SalespersonID: event.target.value };
          }
          return item;
        });

        set(SalesDetailsPayload, newItem);
      }
  );

  return (
    <section className="flex text-[14px] gap-y-2 flex-col gap-y-2 border-b-1 border-gray-200 p-3 w-full h-auto">
      <div className="flex justify-between w-full border-b-1">
        <h1>Warehouse</h1>
        <select
          disabled={true}
          onChange={handleWarehouseSelected}
          defaultValue={props.WarehouseID}
          name="warehouse"
          id="warehouse"
        >
          {props?.WarehouseDetails?.map((warehouse, index) => (
            <option key={index} value={warehouse.WarehouseID}>
              {warehouse.WarehouseID}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between w-full border-b-1">
        <h1>UOM</h1>
        <select
          disabled={true}
          defaultValue={props.UOM}
          onChange={handleUomSelected}
          name="uom"
          id="uom"
        >
          {getDataUom?.map((item, index) => (
            <option key={index} value={item.uom}>
              {item.uom}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between w-full border-b-1 truncate">
        <h1>Sales Person ID</h1>
        <select
          disabled={true}
          defaultValue={props.SalespersonID}
          onChange={handleSalesPersonSelected}
          name="sales"
          id="sales"
          className="w-1/2"
        >
          {getDataSales?.map((item, index) => (
            <option
              className="truncate text-right"
              key={index}
              value={item.salespersonID}
            >
              {item.employeeName}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between w-full border-b-1">
        <h1>Qty</h1>
        <input
          disabled={true}
          onChange={handleQtySelected}
          value={props.OrderQty}
          className="w-[30px] text-right"
          type="number"
        />
      </div>
      <div className="flex justify-between w-full border-b-1">
        <h1>Unit Price</h1>
        <input
          disabled={true}
          value={rupiah(props.UnitPrice as number)}
          className="w-auto text-right"
          type="text"
        />
      </div>
      <div className="flex justify-between w-full border-b-1">
        <h1>Tipe Storage</h1>
        <h1>{props.TipeStorage}</h1>
      </div>
    </section>
  );
};

export default DetailsContent;
