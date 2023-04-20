import { NextPage } from "next";
import { withLayout } from "@moxy/next-layout";
import { PoolContainer } from "containers";
import { Layout } from "components";

const PoolPage: NextPage = () => {
  return (
    <PoolContainer />
  );
};

export default withLayout(<Layout />)(PoolPage);