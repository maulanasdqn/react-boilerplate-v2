import { FC, ReactElement } from "react";
import { ListRecordTypes } from "./types";

type PropsTypes = Pick<
  ListRecordTypes,
  | "Date"
  | "Status"
  | "BillToContact"
  | "OrderedQty"
  | "OrderTotal"
  | "LastModifiedDateTime"
>;

const Content: FC<PropsTypes> = (props): ReactElement => {
  return (
    <section className="flex text-[14px] gap-y-2 flex-col gap-y-2 border-b-1 border-gray-200 p-3 w-full h-auto">
      <div className="flex justify-between w-full border-b-1">
        <h1>Status</h1>
        <h1>{props.Status}</h1>
      </div>
      <div className="flex justify-between w-full border-b-1">
        <h1>Tanggal Pengiriman</h1>
        <h1>{new Date(props.Date).toLocaleDateString()}</h1>
      </div>
      <div className="flex gap-x-6 justify-between w-full border-b-1">
        <h1>Customer</h1>
        <h1 className="truncate">{props.BillToContact?.BusinessName}</h1>
      </div>
      <div className="flex justify-between w-full border-b-1">
        <h1>Ordered Qty</h1>
        <h1>{props.OrderedQty}</h1>
      </div>
      <div className="flex justify-between w-full border-b-1">
        <h1>Order Total</h1>
        <h1>{props.OrderTotal}</h1>
      </div>
      <div className="flex gap-x-6 justify-between w-full border-b-1">
        <h1>Created By</h1>
        <h1 className="truncate">{props.BillToContact?.BusinessName}</h1>
      </div>
      <div className="flex justify-between w-full border-b-1">
        <h1>Created Date</h1>
        <h1>{new Date(props.LastModifiedDateTime).toLocaleDateString()}</h1>
      </div>
    </section>
  );
};

export default Content;
