import type { AppProps } from "next/app";
import Head from "next/head";
import { Layout as DashboardLayout } from "src/layouts/dashboard";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AuthConsumer, AuthProvider } from "src/contexts/auth/jwt-context";

import "simplebar-react/dist/simplebar.min.css";
import "src/styles/globals.css";

import { SnackbarProvider } from "notistack";
import { useNProgress } from "src/hooks/use-nprogress";
import { ToastContainer } from "react-toastify";

const App = (props: AppProps) => {
  const { Component, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);
  useNProgress();

  return (
    <>
      <Head>
        <title>Dịch vụ đưa đón đến trường</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SnackbarProvider>
          <AuthProvider>
            <>{getLayout(<Component {...pageProps} />)}</>
          </AuthProvider>
        </SnackbarProvider>
      </LocalizationProvider>
    </>
  );
};

export default App;
