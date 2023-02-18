import { useMutation } from "@tanstack/react-query";
import SalesService from "@services/Sales";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default () =>
  useMutation({
    mutationKey: ["sync-sales"],
    mutationFn: async () => await SalesService.syncSalesOrder(),
    onSuccess: () => {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: "Berhasil!",
        text: "Berhasil Sync",
        icon: "success",
      });
    },
  });
