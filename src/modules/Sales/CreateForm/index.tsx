import SubLoading from "@components/Loading/SubLoading";
import Modal from "@components/Modal";
import useCustomerHistoryTogle from "@hooks/Common/useCustomerHistoryTogle";
import useInventoryTogle from "@hooks/Common/useInventoryTogle";
import {
  SalesDetails,
  SalesDetailsPayload,
  SalesListPagination,
} from "@stores/Sales";
import { FC, lazy, ReactElement, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import CreateButton from "./Common/Button";
import Form from "./Common/Form";
import Details from "./Details";
import Inventory from "./Inventory";
import Summary from "./Summary";

const Customer = lazy(() => import("./Customer"));

const CreateSalesForm: FC = (): ReactElement => {
  const resetState = useResetRecoilState(SalesListPagination);
  const resetPayload = useResetRecoilState(SalesDetails);
  const setPayload = useSetRecoilState(SalesDetailsPayload);
  const getPayload = useRecoilValue(SalesDetails);
  const { getStatus: getModalCustomer, setStatus: setModalCustomer } =
    useCustomerHistoryTogle();
  const { getStatus: getModalInventory, setStatus: setModalInventory } =
    useInventoryTogle();
  return (
    <Suspense fallback={"Sedang Memuat..."}>
      <Form />
      <CreateButton />
      <Summary
        total_order={0}
        total_price={0}
        total_discount={0}
        total_tax={0}
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

      <Modal
        lookup={getModalInventory}
        title={"Inventory Lookup"}
        onSubmit={() => {
          setPayload((prev) => [...prev, ...getPayload]);
          setModalInventory(false);
        }}
        onClose={() => {
          resetPayload();
          setModalInventory(false);
        }}
        submitText={"Simpan"}
        closeText={"Batal"}
      >
        <ErrorBoundary
          onReset={() => {
            resetState();
          }}
          resetKeys={[resetState()]}
          fallbackRender={({ error }) => (
            <div className="flex flex-col items-center">
              <span className="text-red-500">
                Telah terjadi error saat memuat data inventory
              </span>{" "}
              <span className="text-red-500">{error.message}</span>
            </div>
          )}
        >
          <Suspense fallback={<SubLoading />}>
            <Inventory />
          </Suspense>
        </ErrorBoundary>
      </Modal>
    </Suspense>
  );
};

export default CreateSalesForm;
