import useCustomerHistoryTogle from "@hooks/Common/useCustomerHistoryTogle";
import useInventoryTogle from "@hooks/Common/useInventoryTogle";
import { FC, ReactElement, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const CreateButton: FC = (): ReactElement => {
  const { setStatus: customerModal } = useCustomerHistoryTogle();
  return (
    <ErrorBoundary fallback={<h1>Telah terjadi error</h1>}>
      <Suspense fallback="Loading..">
        <section className="flex gap-x-3">
          <button
            className="bg-blue-500 disabled:bg-blue-300 rounded-lg text-white text-[11px] p-1 w-auto h-auto font-bold"
            children={"Inventory Lookup"}
            disabled={true}
          />
          <button
            className="bg-blue-500 rounded-lg text-[11px] text-white py-1 px-2 w-auto h-auto font-bold"
            children={"Customer History"}
            onClick={() => customerModal(true)}
          />
          <button
            className="bg-red-500 disabled:bg-red-300 rounded-lg text-sm text-white py-2 px-3 w-auto h-auto font-bold "
            children={"Remove"}
            disabled={true}
          />
        </section>
      </Suspense>
    </ErrorBoundary>
  );
};

export default CreateButton;
