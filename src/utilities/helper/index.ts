import moment from "moment";
import { ErrorWithMessage } from "./types";

export const getErrorMessage = (error: unknown): string => {
  console.log(error);
  const err = error as ErrorWithMessage;
  return err?.response?.data?.message;
};

export const formatDate = (val: Date | string | number): string =>
  moment(val).format("YYYY-MM-DD");
