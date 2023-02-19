import SubLoading from "@components/Loading/SubLoading";
import Accordion from "@components/Accordion";
import { FC, ReactElement, Suspense } from "react";
import ContentSummary from "./Content";

type SummaryTypes = {
  total_order: number;
  total_price: number;
  total_discount: number;
  total_tax: number;
};

const Summary: FC<SummaryTypes> = (item): ReactElement => {
  return (
    <Suspense fallback={<SubLoading />}>
      <Accordion
        title={"Order Summary"}
        withButton={false}
        withCheckbox={false}
      >
        <ContentSummary {...item} />
      </Accordion>
    </Suspense>
  );
};

export default Summary;
