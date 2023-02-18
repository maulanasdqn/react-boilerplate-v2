import AuthService from "@services/Auth";
import { AuthTypes } from "@services/Auth/types";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default () => {
  const router = useNavigate();
  return useMutation({
    mutationKey: ["auth-login"],
    mutationFn: async (payload: AuthTypes) => await AuthService.Login(payload),
    onSuccess: () => {
      router(0);
      router("/sales", { replace: true });
    },
  });
};
