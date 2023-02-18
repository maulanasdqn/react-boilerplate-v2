import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import "uno.css";
import "@unocss/reset/tailwind.css";
import ApiService from "@services/Api";
import { RecoilRoot } from "recoil";
import TokenService from "@services/Token";

ApiService.init(import.meta.env.VITE_APP_API_URL);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      suspense: true,
    },
  },
});

if (!!TokenService.getToken()) {
  ApiService.setHeader();
} else {
  ApiService.removeHeader();
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </QueryClientProvider>
  </React.StrictMode>
);
