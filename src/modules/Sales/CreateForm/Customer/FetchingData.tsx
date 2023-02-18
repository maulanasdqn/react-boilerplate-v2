import Accordion from "@components/Accordion";
import useFetchAllCustomer from "@hooks/Customer/useFetchAllCustomer";
import usePaginationSales from "@hooks/Sales/usePaginationSales";
import { FC, ReactElement, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import CustomerContent from "./Content";

const CustomerFetchingData: FC = (): ReactElement => {
  const { getPaginationData } = usePaginationSales();
  const { data } = useFetchAllCustomer(getPaginationData);
  return (
    <ErrorBoundary fallback={<h1 children={"Telah terjadi error"} />}>
      <Suspense fallback={"Loading.."}>
        {data?.map((render) =>
          render.record.map((item, index) => (
            <Accordion
              key={index}
              index={index}
              title={item.OrderNbr + " - " + item.Details[0]?.LineDescription}
              withCheckbox={false}
              withButton={false}
            >
              <CustomerContent
                last_order_date={item.LastModifiedDateTime}
                qty={item.OrderedQty}
                uom={item.Details[0].UOM}
                unit_price={item.Details[0].UnitPrice}
                amount={item.Details[0].UnbilledAmount}
              />
            </Accordion>
          ))
        )}

        {data?.map((item) => item.availablePage)[0] === 0 && (
          <h1 className="text-center w-full">Data tidak ditemukan</h1>
        )}
      </Suspense>
    </ErrorBoundary>
  );
};

export default CustomerFetchingData;
