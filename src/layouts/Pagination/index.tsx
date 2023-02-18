import usePaginationSales from "@hooks/Sales/usePaginationSales";
import { ReactElement, FC, Fragment } from "react";

const Pagination: FC<{ extendRow: boolean }> = ({
  extendRow,
}): ReactElement => {
  const { setPaginationData: setPayload, getPaginationData: payload } =
    usePaginationSales();
  return (
    <section className="flex gap-x-2 w-full items-center justify-center">
      <div className="flex gap-x-1 items-center">
        <span className="text-gray-700 text-xs ">
          Rows per-page: {payload.rowCount} -{" "}
        </span>
        <select
          onChange={(e) => {
            setPayload({ ...payload, ["rowCount"]: parseInt(e?.target.value) });
          }}
          className="appearence-none text-xs bg-none"
          name=""
          id=""
        >
          <option value="5">5</option>
          <option value="10">10</option>
          {extendRow && (
            <Fragment>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="30">30</option>
              <option value="35">35</option>
              <option value="40">40</option>
              <option value="45">45</option>
              <option value="50">50</option>
            </Fragment>
          )}
        </select>
      </div>
      <span className="text-gray-700 text-xs">
        {payload.page <= 0
          ? 1
          : payload.page >= payload?.availablePage
          ? payload.availablePage
          : payload.page}{" "}
        -{" "}
        {payload.page + 1 > payload.availablePage
          ? payload.availablePage
          : payload.page + 1}{" "}
        of {payload.availablePage}
      </span>
      <span
        onClick={() => {
          setPayload({ ...payload, ["page"]: 1 });
        }}
        className="text-gray-700 text-xs"
      >
        {"<<"}
      </span>
      {payload.page === 1 ? (
        <span className="text-gray-700 text-xs">{"<"}</span>
      ) : (
        <span
          onClick={() => {
            setPayload({ ...payload, ["page"]: payload["page"] - 1 });
          }}
          className="text-gray-700 text-xs"
        >
          {"<"}
        </span>
      )}

      {payload?.page >= payload?.availablePage ? (
        <span className="text-gray-700 text-xs">{">"}</span>
      ) : (
        <span
          onClick={() => {
            setPayload({ ...payload, ["page"]: payload["page"] + 1 });
          }}
          className="text-gray-700 text-xs"
        >
          {">"}
        </span>
      )}

      <span
        onClick={() => {
          setPayload({ ...payload, ["page"]: payload.availablePage });
        }}
        className="text-gray-700 text-xs"
      >
        {">>"}
      </span>
    </section>
  );
};

export default Pagination;
