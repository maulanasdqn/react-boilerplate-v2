import SubLoading from "@components/Loading/SubLoading";
import useDebounce from "@hooks/Common/useDebounce";
import usePaginationSales from "@hooks/Sales/usePaginationSales";
import Pagination from "@layouts/Pagination";
import { FC, ReactElement, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useForm } from "react-hook-form";
import { MdSearch } from "react-icons/md";
import CustomerFetchingData from "./FetchingData";

const Customer: FC = (): ReactElement => {
  const { setPaginationData, getPaginationData } = usePaginationSales();
  const { register, watch } = useForm<{
    search: string;
  }>();
  useDebounce(
    () => {
      setPaginationData({
        ...getPaginationData,
        query: watch("search"),
      });
    },
    [watch("search")],
    500
  );
  return (
    <ErrorBoundary fallback={<h1 children={"Telah terjadi Error"} />}>
      <Suspense fallback="Loading..">
        <section className="flex gap-y-3 flex-col w-full items-end">
          <div className="flex gap-x-1 justify-end border-b-1 border-gray-200 w-auto max-w-1/2">
            <MdSearch className="text-[28px] text-gray-400 w-auto" />
            <input
              {...register("search")}
              className="truncate p-1 xs:p-2 relative w-2/3 focus:outline-none text-[14px] border-gray-200"
              name={"search"}
              placeholder={"Search..."}
              type={"text"}
            />
          </div>
          <div className="max-h-[200px] flex flex-col w-full gap-y-2 overflow-y-auto">
            <ErrorBoundary fallback={<h1 children={"Telah terjadi Error"} />}>
              <Suspense fallback={<SubLoading />}>
                <CustomerFetchingData />
              </Suspense>
            </ErrorBoundary>
          </div>
          <Pagination extendRow={false} />
        </section>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Customer;
