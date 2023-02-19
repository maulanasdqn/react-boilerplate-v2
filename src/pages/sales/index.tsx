import Loading from "@components/Loading";
import SubLoading from "@components/Loading/SubLoading";
import { ProtectedRoutes } from "@middleware/ProtectedRoutes";
import { ListBreadCrumb } from "@utils/constant";
import { FC, lazy, ReactElement, Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";

const MainLayouts = lazy(() => import("@layouts/Main"));
const ListContent = lazy(() => import("@modules/Sales/List"));
const HeaderTitle = lazy(
  () => import("@modules/Sales/CreateForm/Common/HeaderTitle")
);
const ContentWrapper = lazy(() => import("@layouts/ContentWrapper"));
const TableLayouts = lazy(() => import("@layouts/Table"));
const BreadCrumbLayouts = lazy(() => import("@layouts/BreadCrumb"));

const SalesList: FC = (): ReactElement => {
  return (
    <ProtectedRoutes>
      <ErrorBoundary
        fallback={
          <h1 className="text-red-500 text-1xl">Telah terjadi error</h1>
        }
      >
        <Suspense fallback={<Loading />}>
          <BreadCrumbLayouts arr={ListBreadCrumb} />
          <HeaderTitle title="Sales Order" withMenu={false} />
          <MainLayouts>
            <ContentWrapper withHeader={true}>
              <TableLayouts>
                <ErrorBoundary
                  fallback={
                    <div className="flex flex-col items-center p-4 gap-y-2">
                      <h1>Terjadi Error</h1>
                    </div>
                  }
                >
                  <Suspense fallback={<SubLoading />}>
                    <ListContent />
                  </Suspense>
                </ErrorBoundary>
              </TableLayouts>
            </ContentWrapper>
          </MainLayouts>
        </Suspense>
      </ErrorBoundary>
    </ProtectedRoutes>
  );
};

export default SalesList;
