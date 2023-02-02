import Loading from "@components/Loading";
import { QueryClient } from "@tanstack/react-query";
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "@unocss/reset/tailwind.css";
import "uno.css";

const App = lazy(() => import("./App"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<Loading text="Memuat Data..." />}>
      <App />
    </Suspense>
  </React.StrictMode>
);
