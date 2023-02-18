import Modal from "@components/Modal";
import useCustomerHistoryTogle from "@hooks/Common/useCustomerHistoryTogle";
import { FC, lazy, ReactElement, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import CreateButton from "./Common/Button";
import Form from "./Common/Form";

const Customer = lazy(() => import("./Customer"));

const CreateSalesForm: FC = (): ReactElement => {
  const { getStatus: getModalCustomer, setStatus: setModalCustomer } =
    useCustomerHistoryTogle();
  return (
    <Suspense fallback={"Sedang Memuat..."}>
      <Form />
      <CreateButton />
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

export default CreateSalesForm;
