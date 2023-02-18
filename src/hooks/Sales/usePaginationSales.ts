import { useRecoilState } from "recoil";
import { SalesListPagination } from "@stores/Sales";
import { MetaTypes } from "@services/types";

export default () => {
  const [get, set] = useRecoilState(SalesListPagination);
  return {
    setPaginationData: (val: MetaTypes) => {
      set(val);
    },
    getPaginationData: get,
  };
};
