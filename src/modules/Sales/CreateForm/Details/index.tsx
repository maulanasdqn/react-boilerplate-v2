import SubLoading from "@components/Loading/SubLoading";
import { FC, Fragment, ReactElement, Suspense } from "react";
import FetchingDataDetails from "./FetchingData";

const Details: FC = (): ReactElement => {
  return (
    <Fragment>
      <Suspense fallback={<SubLoading />}>
        <FetchingDataDetails />
      </Suspense>
    </Fragment>
  );
};

export default Details;
