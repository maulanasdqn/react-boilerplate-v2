import { MdSearch } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";
import { ReactElement, FC, Suspense, Key, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import SubLoading from "@components/Loading/SubLoading";
import { useForm } from "react-hook-form";
import { CreateSalesTypes } from "../types";
import { useSetRecoilState } from "recoil";
import { SalesCreatePayload } from "@stores/Sales";

const Form: FC = (): ReactElement => {
  const setPayload = useSetRecoilState(SalesCreatePayload);
  const { register, watch } = useForm<CreateSalesTypes>({
    defaultValues: {
      CustomerId: "",
      OrderNbr: "",
      Description: "",
      Date: "",
      LocationId: "MAIN",
      Dry: false,
      Frozen: false,
      VATCode: "",
      OrderType: "SO",
      Status: "On Hold",
    },
  });

  const locationOptions = [
    {
      value: "MAIN",
      label: "MAIN",
    },
  ];

  const className =
    "p-3 rounded-lg border-1 bg-white border-gray-500 w-full focus:outline-blue-500 appearance-none outline-none";

  useEffect(() => {
    setPayload({ ...watch() });
  }, [watch()]);

  return (
    <ErrorBoundary fallback={<h1>Telah terjadi error</h1>}>
      <Suspense fallback="Loading..">
        <ErrorBoundary
          fallback={<span className="text-red-500">Telah terjadi error</span>}
        >
          <Suspense fallback={<SubLoading />}>
            <div className="flex flex-col relative">
              <input
                {...register("OrderNbr")}
                className={className + "appearance-none"}
                name="orderNbr"
                type="text"
                disabled={true}
              />
              <label
                className="bg-white block absolute bottom-10 bg-white left-4 font-medium text-[14px]"
                htmlFor="OrderNbr"
              >
                OrderNbr
              </label>
            </div>
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary
          fallback={<span className="text-red-500">Telah terjadi error</span>}
        >
          <Suspense fallback={<SubLoading />}>
            <div className="flex flex-col relative">
              <input
                {...register("Status")}
                className={className + "appearance-none"}
                name="Status"
                type="text"
                disabled={true}
              />
              <label
                className="bg-white block absolute bottom-10 bg-white left-4 font-medium text-[14px]"
                htmlFor="Status"
              >
                Status
              </label>
            </div>
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary
          fallback={<span className="text-red-500">Telah terjadi error</span>}
        >
          <Suspense fallback={<SubLoading />}>
            <div className="flex flex-col relative">
              <input
                {...register("Date")}
                className={className + "appearance-none"}
                name="Date"
                type="date"
              />
              <label
                className="bg-white block absolute bottom-10 bg-white left-4 font-medium text-[14px]"
                htmlFor="Date"
              >
                Date
              </label>
            </div>
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary
          fallback={<span className="text-red-500">Telah terjadi error</span>}
        >
          <Suspense fallback={"Sedang Memuat..."}>
            <div className="flex flex-col relative">
              <MdSearch className="text-[26px] absolute right-2 top-3" />
              <input
                {...register("CustomerId")}
                list="customers"
                className={className + "appearance-none"}
                name="CustomerId"
                id="CustomerId"
                type="search"
              />
              <label
                className="bg-white block absolute bottom-10 bg-white left-4 font-medium text-[14px]"
                htmlFor="customerId"
              >
                Customer
              </label>
            </div>
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary
          fallback={<span className="text-red-500">Telah terjadi error</span>}
        >
          <Suspense fallback={"Sedang Memuat..."}>
            <div className="flex flex-col relative">
              <FaCaretDown className="text-[26px] absolute right-2 top-3" />
              <select
                {...register("LocationId")}
                className={className + "appearance-none"}
                name="LocationId"
                id="LocationId"
              >
                {locationOptions?.map((x, i) => (
                  <option className="truncate" key={i} value={x.label}>
                    {x.label}
                  </option>
                ))}
              </select>
              <label
                className="bg-white block absolute bottom-10 bg-white left-4 font-medium text-[14px]"
                htmlFor="locationId"
              >
                Location
              </label>
            </div>
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary
          fallback={<span className="text-red-500">Telah terjadi error</span>}
        >
          <Suspense fallback={"Sedang Memuat..."}>
            <div className="flex flex-col relative">
              <input
                {...register("VATCode")}
                disabled={true}
                className={className}
                name={"VATCode"}
                type={"text"}
              />
              <label
                className="bg-white block absolute bottom-10 bg-white left-4 font-medium text-[14px]"
                htmlFor="VATCode"
              >
                VAT
              </label>
            </div>
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary
          fallback={<span className="text-red-500">Telah terjadi error</span>}
        >
          <Suspense fallback={"Sedang Memuat..."}>
            <div className="flex flex-col relative">
              <input
                {...register("Description")}
                className={className}
                name={"Description"}
                placeholder={""}
                type={"text"}
              />
              <label
                className="bg-white block absolute bottom-10 bg-white left-4 font-medium text-[14px]"
                htmlFor="Description"
              >
                Description
              </label>
            </div>
          </Suspense>
        </ErrorBoundary>

        <div className="flex gap-x-4 w-full">
          <div className="flex items-center gap-x-1">
            <input type={"checkbox"} disabled={true} name="Dry" />
            <label htmlFor="Dry">Dry</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input type={"checkbox"} disabled={true} name="Frozen" />
            <label htmlFor="Frozen">Frozen</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type={"checkbox"}
              disabled={true}
              name="Pengajuan"
              checked={false}
            />
            <label htmlFor="Pengajuan">Pengajuan</label>
          </div>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Form;
