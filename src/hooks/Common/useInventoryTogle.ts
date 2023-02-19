import { useRecoilState, useResetRecoilState } from "recoil";
import { InventoryTogle } from "@stores/Common";
import { SalesListPagination } from "@stores/Sales";

export default () => {
  const resetPagination = useResetRecoilState(SalesListPagination);
  resetPagination();
  const [get, set] = useRecoilState(InventoryTogle);
  return {
    getStatus: get,
    setStatus: (val: boolean) => set(val),
  };
};
