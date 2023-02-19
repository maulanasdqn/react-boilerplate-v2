import { formatDate } from "@utils/helper";
import { FC, ReactElement } from "react";

const CustomerContent: FC<{
  last_order_date: string | number | Date;
  qty: number;
  uom: string;
  unit_price: number;
  amount: number;
}> = (props): ReactElement => {
  return (
    <section className="flex text-[14px] gap-y-2 flex-col gap-y-2 border-b-1 border-gray-200 p-3 w-full h-auto">
      <div className="flex justify-between w-full border-b-1">
        <h1>Last Order Date</h1>
        <h1>{formatDate(props.last_order_date)}</h1>
      </div>
      <div className="flex justify-between w-full border-b-1">
        <h1>Qty</h1>
        <h1>{props.qty}</h1>
      </div>
      <div className="flex justify-between w-full border-b-1">
        <h1>Unit Price</h1>
        <h1>{props.unit_price}</h1>
      </div>
      <div className="flex justify-between w-full border-b-1">
        <h1>Amount</h1>
        <h1>{props.amount}</h1>
      </div>
      <div className="flex justify-between w-full border-b-1">
        <h1>Uom</h1>
        <h1>{props.uom}</h1>
      </div>
    </section>
  );
};

export default CustomerContent;
