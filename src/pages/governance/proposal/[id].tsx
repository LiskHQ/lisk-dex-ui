import { NextPage } from "next";
import { withLayout } from "@moxy/next-layout";
import { ProposalContainer } from "containers";
import { Layout } from "components";

const ProposalPage: NextPage = () => {
  return (
    <ProposalContainer />
  );
};

export default withLayout(<Layout />)(ProposalPage);