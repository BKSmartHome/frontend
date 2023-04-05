import "@styles/globals.scss";

import { MainLayout } from "@layouts/MainLayout";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { useEffect } from "react";

/**
 * Default layout for page component
 */

const DefaultLayout: IComponent = ({ children }) => <>{children}</>;
const ThemeProvider = dynamic(() =>
  import("@material-tailwind/react/context/theme").then(
    (data) => data.ThemeProvider
  )
);

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout =
    (Component as IPageComponent).getLayout ||
    ((children) => <DefaultLayout>{children}</DefaultLayout>);

  const PageContent = Component as IPageComponent;
  useEffect(() => {
    fetch("http://localhost:3000/api/socket");
  }, []);

  return (
    <ThemeProvider value={undefined}>
      <MainLayout>{getLayout(<PageContent {...pageProps} />)}</MainLayout>
    </ThemeProvider>
  );
}

export default MyApp;
