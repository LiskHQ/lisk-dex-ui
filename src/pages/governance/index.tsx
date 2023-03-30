import { NextPage } from "next";
import { withLayout } from "@moxy/next-layout";

import Governance from "components/_page/Governance";
import Layout from "components/common/Layout";

const GovernanacePage: NextPage = () => {
  return (
    <Governance />
  );
};

export default withLayout(<Layout />)(GovernanacePage);