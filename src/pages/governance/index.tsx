import { NextPage } from "next";
import { withLayout } from "@moxy/next-layout";
import { GovernanceContainer } from "containers";
import { Layout } from "components";

const GovernanacePage: NextPage = () => {
  return (
    <GovernanceContainer />
  );
};

export default withLayout(<Layout />)(GovernanacePage);