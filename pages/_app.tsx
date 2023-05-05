import "@styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";

import { ComponentLoading } from "@components/ComponentLoading";
import { customThemeMaterialTailwind } from "@configs/styles";
import { AuthenticationHOC as AuthenticationHOCStatic } from "@layouts/AuthenticationHOC";
import { MainLayout } from "@layouts/MainLayout";
import { ThemeProvider as ThemeProviderStatic } from "@material-tailwind/react";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";
import { ToastContainer as ToastContainerStatic } from "react-toastify";

/**
 * Default layout for page component
 */

const DefaultLayout: IComponent = ({ children }) => <>{children}</>;
const ThemeProvider = dynamic<React.ComponentProps<typeof ThemeProviderStatic>>(
  () =>
    import("@material-tailwind/react/context/theme").then(
      (data) => data.ThemeProvider
    )
);

const AuthenticationHOC = dynamic<
  React.ComponentProps<typeof AuthenticationHOCStatic>
>(
  () =>
    import("@layouts/AuthenticationHOC").then((data) => data.AuthenticationHOC),
  { loading: () => <ComponentLoading /> }
);
const ToastContainer = dynamic<
  React.ComponentProps<typeof ToastContainerStatic>
>(() => import("react-toastify").then((data) => data.ToastContainer), {
  ssr: false,
});

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout =
    (Component as IPageComponent).getLayout ||
    ((children) => <DefaultLayout>{children}</DefaultLayout>);

  const PageContent = Component as IPageComponent;
  const title = "Smart Home Iot";

  return (
    <ThemeProvider value={customThemeMaterialTailwind}>
      <MainLayout>
        <Head>
          <title>{title}</title>
        </Head>
        {/* <AuthenticationHOC> */}
        {getLayout(<PageContent {...pageProps} />, pageProps)}
        {/* </AuthenticationHOC> */}
      </MainLayout>

      <ToastContainer position={"bottom-right"} autoClose={3000} pauseOnHover />
    </ThemeProvider>
  );
}

export default MyApp;
