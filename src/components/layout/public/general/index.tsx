import Head from "next/head";
import Header from "./header";

const General = ({ children }) => {
  return (
    <>
      <Head>
        <title>Lisk Dex</title>
      </Head>
      <Header />
      {children}
    </>
  );
};

export default General;
