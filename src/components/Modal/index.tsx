import { ReactElement, FC, Suspense } from "react";
import { PropsTypes } from "./types";

const Modal: FC<PropsTypes> = (props): ReactElement => {
  return (
    <Suspense>
      {props.lookup && (
        <div
          className="relative z-20"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div className="fixed inset-0 z-10 overflow-y-auto h-full">
            <div className="flex min-h-full justify-center h-[490px] p-4 text-center items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-[400px]">
                <div className="bg-white px-4 py-2">
                  <div className="sm:flex sm:items-start">
                    <div className="text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-lg text-left font-medium leading-6 text-gray-900 mb-2"
                        id="modal-title"
                      >
                        {props.title}
                      </h3>
                      <hr />
                      <div className="mt-4">{props.children}</div>
                    </div>
                  </div>
                </div>
                {props?.closeText?.length !== 0 && (
                  <div className="bg-gray-50 flex gap-x-[49px] px-[49px] py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      onClick={props.onClose}
                      type="button"
                      className="disabled:bg-gray-300 flex w-full items-center justify-center rounded-md bg-white border-2 p-1.5 border-blue-500 text-blue-500 text-base font-bold"
                    >
                      {props.closeText}
                    </button>
                    <button
                      onClick={props.onSubmit}
                      className="p-1.5 disabled:bg-blue-300 flex w-full items-center justify-center rounded-md bg-blue-500 text-white text-base font-bold"
                    >
                      {props.submitText}
                    </button>
                  </div>
                )}
                {props?.closeText?.length === 0 && (
                  <div className="bg-gray-50 flex gap-x-[49px] items-center justify-center px-[49px] py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      onClick={props.onSubmit}
                      type="button"
                      className="disabled:bg-gray-300 flex w-1/2 items-center justify-center rounded-md bg-white border-2 p-1.5 border-blue-500 text-blue-500 text-base font-bold"
                    >
                      {props.submitText}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Suspense>
  );
};

export default Modal;
