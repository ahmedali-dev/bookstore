import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import "./styles/main.scss";
import { Flip, ToastContainer as Toaster } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./hooks/useAuth";
import Error from "./Error/Error";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Toaster stacked theme="colored" transition={Flip} autoClose={3000} />
            <Error>
              <App />
            </Error>
          </BrowserRouter>
        </QueryClientProvider>
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);
