import BarcodeScanner from "@components/BarcodeScanner";
import SubLoading from "@components/Loading/SubLoading";
import Modal from "@components/Modal";
import TextField from "@components/TextField";
import useDebounce from "@hooks/Common/useDebounce";
import { QuerySearch } from "@stores/Common";
import { FC, Fragment, ReactElement, Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BsSearch } from "react-icons/bs";
import { FaBarcode } from "react-icons/fa";
import { useSetRecoilState } from "recoil";
import InventoryFetchingData from "./FetchingData";

const Inventory: FC = (): ReactElement => {
  const querySearch = useSetRecoilState(QuerySearch);
  const [qrLookup, setQrLookup] = useState(false);
  const [resLookup, setResLookup] = useState(false);
  const [qrData, setQrData] = useState("");
  const [search, setSearch] = useState("");
  useDebounce(
    () => {
      querySearch(search);
    },
    [search],
    500
  );
  return (
    <ErrorBoundary fallback={<h1 children={"Telah terjadi Error"} />}>
      <Suspense fallback="Loading..">
        <Modal
          lookup={qrLookup}
          title={"Scanner"}
          children={
            <div className="flex flex-col gap-y-2 h-auto p-4 overflow-hidden">
              <Suspense fallback="Memuat kamera..">
                <BarcodeScanner
                  onSuccess={setResLookup}
                  onClose={setQrLookup}
                  onRes={setQrData}
                />
              </Suspense>
            </div>
          }
          onSubmit={() => {
            setQrLookup(!qrLookup);
          }}
          submitText={"Batal"}
          closeText={""}
        />

        <Modal
          lookup={resLookup}
          title={"Scanner"}
          children={
            <TextField
              name={"Scan Result"}
              placeholder={""}
              className="p-3 rounded-lg border-1 bg-white border-gray-500 w-full focus:outline-blue-500 appearance-none outline-none"
              type={"text"}
              value={qrData}
              label="Scanner"
              readOnly
            />
          }
          onSubmit={() => {
            setResLookup(!resLookup);
            setSearch(qrData);
          }}
          onClose={() => {
            setResLookup(!resLookup);
            setSearch("");
          }}
          submitText={"Simpan"}
          closeText={"Batal"}
        />

        <TextField
          name={"search"}
          placeholder={""}
          className="p-3 rounded-lg border-1 borde-gray-500 w-auto"
          type={"text"}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          label="Inventory"
          required
          icon={
            <Fragment>
              <BsSearch className="text-[20px] text-blue-500 mr-6 font-thin absolute right-4 top-4 z-10" />
              <FaBarcode
                onClick={() => setQrLookup(true)}
                className="text-[20px] text-blue-500 font-thin absolute right-4 top-4 z-10"
              />
            </Fragment>
          }
        />
        <div className="max-h-[200px] mt-3 flex flex-col w-full gap-y-2 overflow-y-auto">
          <ErrorBoundary
            fallback={<h1 children={"Error saat memuat data inventory"} />}
          >
            <Suspense fallback={<SubLoading />}>
              <InventoryFetchingData />
            </Suspense>
          </ErrorBoundary>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Inventory;
