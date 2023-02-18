import Accordion from "@components/Accordion";
import useFetchAllSales from "@hooks/Sales/useFetchAllSales";
import usePaginationSales from "@hooks/Sales/usePaginationSales";
import { FC, Fragment, ReactElement } from "react";
import Content from "./Content";

const FetchingData: FC = (): ReactElement => {
  const { getPaginationData } = usePaginationSales();
  const { data } = useFetchAllSales(getPaginationData);
  return (
    <Fragment>
      {data?.map((item, index) =>
        item.availablePage === 0 ? (
          <h1 key={index}>Data tidak ada</h1>
        ) : (
          <Fragment key={index}>
            {data?.map((render) =>
              render.record.map((item, index) => (
                <Accordion
                  key={index}
                  index={index}
                  slug={item.OrderNbr}
                  withCheckbox={false}
                  withButton={true}
                  title={item.OrderNbr}
                >
                  <Content
                    Date={item.Date}
                    Status={item.Status}
                    BillToContact={item.BillToContact}
                    OrderedQty={item.OrderedQty}
                    OrderTotal={item.OrderTotal}
                    LastModifiedDateTime={item.LastModifiedDateTime}
                  />
                </Accordion>
              ))
            )}
          </Fragment>
        )
      )}
    </Fragment>
  );
};

export default FetchingData;
