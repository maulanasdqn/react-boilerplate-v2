import { ReactElement, FC, Suspense, lazy, Fragment } from "react";
import Loading from "@components/Loading";
import { ProtectedRoutes } from "@middleware/ProtectedRoutes";
import { DetailsBreadCrumb } from "@utils/constant";
import SalesForm from "@modules/Sales/UpdateForm";

const DetailSales: FC = (): ReactElement => {
  const BreadCrumbLayouts = lazy(() => import("@layouts/BreadCrumb"));
  const MainLayouts = lazy(() => import("@layouts/Main"));
  const HeaderTitle = lazy(
    () => import("@modules/Sales/UpdateForm/Common/HeaderTitle")
  );
  const ContentWrapper = lazy(() => import("@layouts/ContentWrapper"));

  return (
    <Suspense fallback={<Loading />}>
      <ProtectedRoutes>
        <Fragment>
          <BreadCrumbLayouts arr={DetailsBreadCrumb} />
          <HeaderTitle withMenu={true} title={"Sales Order"} />
          <MainLayouts>
            <ContentWrapper withHeader={false}>
              <SalesForm />
            </ContentWrapper>
          </MainLayouts>
        </Fragment>
      </ProtectedRoutes>
    </Suspense>
  );
};

export default DetailSales;
