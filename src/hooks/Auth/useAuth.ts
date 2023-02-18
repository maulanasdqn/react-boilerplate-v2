import { isAuth } from "@stores/Auth";
import { useRecoilValue } from "recoil";

export default () => {
  return useRecoilValue(isAuth);
};
