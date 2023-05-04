import { NextPage } from "next";
import { withLayout } from "@moxy/next-layout";
import { CreateProposalContainer } from "containers";
import { Layout } from "components";

const CreateProposalPage: NextPage = () => {
  return (
    <CreateProposalContainer />
  );
};

export default withLayout(<Layout />)(CreateProposalPage);