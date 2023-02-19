import AltLoading from "@components/Loading/AltLoading";
import useCreateSalesOrder from "@hooks/Sales/useCreateSalesOrder";
import useSyncSales from "@hooks/Sales/useSyncSales";
import { OrderNbr } from "@stores/Common";
import { SalesCreatePayload, SalesDetailsPayload } from "@stores/Sales";
import { FC, Fragment, ReactElement, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

type PropsTypes = {
  title: string;
  withMenu: boolean;
};

const HeaderTitle: FC<PropsTypes> = ({ title, withMenu }): ReactElement => {
  const getPayload = useRecoilValue(SalesCreatePayload);
  const [getDetails, setDetails] = useRecoilState(SalesDetailsPayload);
  const setOrderNbr = useSetRecoilState(OrderNbr);
  const MySwal = withReactContent(Swal);
  const { mutate, isLoading } = useCreateSalesOrder();
  const { mutate: sync } = useSyncSales();
  const [isMenuShow, setShowMenu] = useState(false);
  const [hold, setHold] = useState(false);
  const navigate = useNavigate();
  return (
    <Fragment>
      {isLoading && <AltLoading />}
      <section
        data-testid="header-title"
        className="flex w-full flex-col gap-y-1 py-3"
      >
        <div className="flex justify-between w-full items-center">
          <h1 className="text-[24px] font-bold text-black-900">{title}</h1>
          {withMenu && (
            <BsThreeDots
              onClick={() => setShowMenu((prev) => !prev)}
              className="text-[20px]"
            />
          )}
        </div>
        <hr className="border-1 rounded-full border-gray-300" />
        {isMenuShow && (
          <ul className="flex focus:text-blue-400 text-[14px] w-auto flex-col gap-y-3 absolute z-10 p-3 bg-white rounded-lg right-5 top-31 shadow-md">
            <li
              onClick={() =>
                mutate(
                  {
                    ...getPayload,
                    Details: getDetails.map((item) => ({
                      Branch: item.Branch || "SIDOARJO",
                      DiscountAmount: item.DiscountAmount || 0,
                      InventoryID: item.InventoryID,
                      OrderQty: item.OrderQty,
                      SalespersonID: item.SalespersonID || "",
                      TaxCategory: item.TaxCategory,
                      LineNbr: item.LineNbr,
                      UOM: item.UOM,
                      UnitPrice: item.UnitPrice || 0,
                      WarehouseID: item.WarehouseID,
                    })),
                  },
                  {
                    onSuccess: (data: { orderNbr: string }) => {
                      setShowMenu(false);
                      sync();
                      setOrderNbr(data.orderNbr);
                      setDetails([]);
                      navigate(`/sales/${data.orderNbr}`, { replace: true });
                      MySwal.fire({
                        title: (
                          <p className="text-green-500">
                            Berhasil Menambah Data
                          </p>
                        ),
                        icon: "success",
                      });
                    },

                    onError: (err) => {
                      MySwal.fire({
                        title: <p className="text-red-500">{`${err}`}</p>,
                        icon: "error",
                      });
                    },
                  }
                )
              }
              className="text-blue-400"
            >
              Save
            </li>
            <li className="text-blue-400">{hold ? "Hold" : "Remove Hold"}</li>
          </ul>
        )}
      </section>
    </Fragment>
  );
};

export default HeaderTitle;
