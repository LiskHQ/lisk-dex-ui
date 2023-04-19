import { NextPage } from "next";
import { withLayout } from "@moxy/next-layout";
import { SwapContainer } from "containers";
import { Layout } from "components";

const SwapPage: NextPage = () => {
  return (
    <SwapContainer />
  );
};

export default withLayout(<Layout />)(SwapPage);