import axios from "axios";
import TokenService from "@services/Token";

const ApiService = {
  init(baseURL: string) {
    axios.defaults.baseURL = baseURL;
  },

  setHeader() {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${TokenService.getToken()}`;
  },

  removeHeader() {
    axios.defaults.headers.common = {};
  },

  customRequest(data: object) {
    return axios(data);
  },
};

export default ApiService;
