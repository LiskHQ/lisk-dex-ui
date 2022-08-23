import "/styles/globals.css";
import { LayoutTree } from "@moxy/next-layout";

const MyApp = ({ Component, pageProps }) => {
  return <LayoutTree Component={Component} pageProps={pageProps} />;
};

export default MyApp;
