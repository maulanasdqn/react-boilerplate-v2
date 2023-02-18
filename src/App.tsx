// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Loading from "@components/Loading";
import Navbar from "@components/Navbar";
import useAuth from "@hooks/Auth/useAuth";
import { FC, Fragment, ReactElement, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

const pages = import.meta.glob("./pages/**/*.tsx", { eager: true });

const routes = [];
for (const path of Object.keys(pages)) {
  const fileName = path.match(/\.\/pages\/(.*)\.tsx$/)?.[1];
  if (!fileName) {
    continue;
  }

  const normalizedPathName = fileName.includes("$")
    ? fileName.replace("$", ":")
    : fileName.replace(/\/index/, "");

  routes.push({
    path: fileName === "index" ? "/" : `/${normalizedPathName.toLowerCase()}`,
    Element: pages[path].default,
    loader: pages[path]?.loader,
    action: pages[path]?.action,
    ErrorBoundary: pages[path]?.ErrorBoundary,
  });
}

const router = createBrowserRouter(
  routes.map(({ Element, ErrorBoundary, ...rest }) => ({
    ...rest,
    element: <Element />,
    ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
  }))
);

const App: FC = (): ReactElement => {
  const isAuth = useAuth();
  return (
    <Fragment>
      {isAuth && <Navbar />}
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ resetErrorBoundary }) => (
              <div>
                There was an error!
                <Button onClick={() => resetErrorBoundary()}>Try again</Button>
              </div>
            )}
          >
            <Suspense fallback={<Loading />}>
              <section className="px-[19px] pb-[19px]">
                <RouterProvider router={router} />
              </section>
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Fragment>
  );
};

export default App;
