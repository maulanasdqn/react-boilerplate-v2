import ApiService from "@services/Api";
import TokenService from "@services/Token";
import { getErrorMessage } from "@utils/helper";
import { AuthTypes } from "./types";

const AuthService = {
  Login: async (payload: AuthTypes) => {
    const requestData = {
      method: "post",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-powered-by": "ASP.NET",
      },
      data: payload,
      url: "/Auth/Login",
    };
    try {
      const res = await ApiService.customRequest(requestData);
      TokenService.saveToken(res.data.token);
      ApiService.setHeader();
      return res.data;
    } catch (error) {
      throw getErrorMessage(error);
    }
  },

  Logout: () => {
    ApiService.removeHeader();
    TokenService.removeToken();
    TokenService.removeRefreshToken();
    window.location.reload();
  },
};

export default AuthService;
