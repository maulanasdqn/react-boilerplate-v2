import TokenService from "@services/Token";
import { atom } from "recoil";

export const isAuth = atom({
  key: "is-auth",
  default: !!TokenService.getToken(),
});
