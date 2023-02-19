import { FC, ReactElement } from "react";

const ContentSummary: FC<{
  total_order: number;
  total_price: number;
  total_discount: number;
  total_tax: number;
}> = (props): ReactElement => {
  return (
    <section className="flex text-[14px] gap-y-2 flex-col gap-y-2 border-b-1 border-gray-200 p-3 w-full h-auto">
      <div className="flex justify-between w-full border-b-1">
        <h1>Total Order</h1>
        <h1>{props.total_order}</h1>
      </div>
      <div className="flex justify-between w-full border-b-1">
        <h1>Total Price</h1>
        <h1>{props.total_price}</h1>
      </div>
      <div className="flex justify-between w-full border-b-1">
        <h1>Total Discount</h1>
        <h1>{props.total_discount}</h1>
      </div>
      <div className="flex justify-between w-full border-b-1">
        <h1>Total Tax</h1>
        <h1>{props.total_tax}</h1>
      </div>
    </section>
  );
};

export default ContentSummary;
