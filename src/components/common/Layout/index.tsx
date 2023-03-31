import { Container, useMediaQuery } from "@mui/material";
import Head from "next/head";
import { ReactNode } from "react";
import { darkTheme } from "styles/theme";
import Footer from "./Footer";
import Header from "./Header";

interface IProps {
  children?: ReactNode,
}

const Layout: React.FC<IProps> = ({ children }) => {
  const isUpMd = useMediaQuery(darkTheme.breakpoints.up(darkTheme.breakpoints.values.md));
  return (
    <Container maxWidth="xl" style={{ padding: 0 }}>
      <Head>
        <title>Lisk Dex</title>
      </Head>
      <Header />
      {children}
      {
        isUpMd ? <></> : <Footer />
      }
    </Container>
  );
};

export default Layout;
