import Modal from "@components/Modal";
import useCustomerHistoryTogle from "@hooks/Common/useCustomerHistoryTogle";
import useInventoryTogle from "@hooks/Common/useInventoryTogle";
import useFetchDetailSalesOrder from "@hooks/Sales/useFetchDetailSalesOrder";
import { SalesListPagination } from "@stores/Sales";
import { FC, lazy, ReactElement, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router-dom";
import CreateButton from "./Common/Button";
import Form from "./Common/Form";
import Details from "./Details";
import Summary from "./Summary";

const Customer = lazy(() => import("./Customer"));

const UpdateSalesForm: FC = (): ReactElement => {
  const { getStatus: getModalCustomer, setStatus: setModalCustomer } =
    useCustomerHistoryTogle();
  const { slug } = useParams();
  const { data } = useFetchDetailSalesOrder(slug as string);
  return (
    <Suspense fallback={"Sedang Memuat..."}>
      <Form />
      <CreateButton />
      <Summary
        total_price={data?.OrderTotal || 0}
        total_order={data?.OrderedQty || 0}
        total_discount={data?.DiscountTotal || 0}
        total_tax={data?.TaxTotal || 0}
      />
      <h1 className="text-base">Details</h1>
      <Details />
      <Modal
        lookup={getModalCustomer}
        title={"Customer History"}
        onSubmit={() => setModalCustomer(false)}
        onClose={() => setModalCustomer(false)}
        submitText={"OK"}
        closeText={""}
      >
        <ErrorBoundary
          fallback={<span className="text-red-500">Telah terjadi error</span>}
        >
          <Suspense fallback={"Sedang Memuat..."}>
            <Customer />
          </Suspense>
        </ErrorBoundary>
      </Modal>
    </Suspense>
  );
};

export default UpdateSalesForm;
