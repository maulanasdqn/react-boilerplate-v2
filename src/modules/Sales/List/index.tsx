import { FC, Fragment, ReactElement, Suspense } from "react";
import { BiRefresh } from "react-icons/bi";
import { Link } from "react-router-dom";
import FetchingData from "./FetchingData";
import { ErrorBoundary } from "react-error-boundary";
import Pagination from "@layouts/Pagination";
import SubLoading from "@components/Loading/SubLoading";
import useSyncSales from "@hooks/Sales/useSyncSales";
import AltLoading from "@components/Loading/AltLoading";

const ListContent: FC = (): ReactElement => {
  const { mutate, isLoading, isSuccess } = useSyncSales();
  return (
    <Fragment>
      {isLoading && <AltLoading />}
      <section className="flex flex-col gap-y-1 items-start w-full">
        <div className="flex w-full items-center gap-y-4 py-2 justify-between">
          <Link
            to={"/sales/add"}
            className="text-sm text-blue-500"
            type={"button"}
          >
            Add So +
          </Link>
          <div
            onClick={() => mutate()}
            className="flex justify-center gap-x-1 cursor-pointer items-center"
          >
            <h2 className="text-sm text-blue-500">Sync</h2>
            <BiRefresh className="text-xl text-blue-500" />
          </div>
        </div>
        <ErrorBoundary
          fallbackRender={({ resetErrorBoundary }) => (
            <div className="flex flex-col w-full justify-center items-center p-4 gap-y-2">
              <h1 className="text-red-600">Telah Terjadi Error</h1>
              <button
                onClick={() => {
                  resetErrorBoundary();
                }}
                className="bg-red-400 text-white font-medium p-3 w-auto h-auto rounded-lg"
              >
                Refetch Data
              </button>
            </div>
          )}
        >
          <Suspense fallback={<SubLoading />}>
            <FetchingData />
          </Suspense>
        </ErrorBoundary>
        <Pagination extendRow={false} />
      </section>
    </Fragment>
  );
};

export default ListContent;
