import { MdSearch } from "react-icons/md";
import { ReactElement, FC, ChangeEvent } from "react";
import usePaginationSales from "@hooks/Sales/usePaginationSales";
import { useForm } from "react-hook-form";
import useDebounce from "@hooks/Common/useDebounce";
import { formatDate } from "@utils/helper";

const Header: FC = (): ReactElement => {
  const { setPaginationData, getPaginationData } = usePaginationSales();
  const { register, watch } = useForm<{
    search: string;
    start: string;
    end: string;
  }>();
  useDebounce(
    () => {
      setPaginationData({
        ...getPaginationData,
        query: watch("search"),
        start: watch("start"),
        end: watch("end"),
      });
    },
    [watch("search"), watch("start"), watch("end")],
    500
  );
  return (
    <section className="flex items-center justify-between w-full">
      <div className="flex flex-col">
        <h1 className="text-gray-400 xs:text-[16px] text-[15px] w-auto truncate">
          Sales Order
        </h1>
      </div>
      <div className="flex flex-col gap-y-2 justify-end items-end">
        <div className="flex gap-x-1 justify-end border-b-1 border-gray-200 w-[120px] max-w-auto">
          <MdSearch className="text-[28px] text-gray-400 w-auto" />
          <input
            {...register("search")}
            className="truncate p-1 xs:p-2 relative w-2/3 focus:outline-none text-[14px] border-gray-200"
            name={"search"}
            placeholder={"Search..."}
            type={"text"}
          />
        </div>
        <div className="flex flex-col gap-y-1 justify-end items-end">
          <div className="flex gap-x-1 justify-end">
            <label htmlFor="date-start" className="text-xs">
              Start
            </label>
            <input
              defaultValue={formatDate(new Date(Date.now()))}
              {...register("start")}
              className="text-xs w-2/3 max-w-xs"
              name={"start"}
              placeholder={"Start Date"}
              type={"date"}
            />
          </div>
          <div className="flex gap-x-1 justify-end">
            <label htmlFor="date-end" className="text-xs">
              End
            </label>
            <input
              defaultValue={formatDate(new Date(Date.now()))}
              {...register("end")}
              className="text-xs w-2/3"
              name={"end"}
              placeholder={"End Date"}
              type={"date"}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
