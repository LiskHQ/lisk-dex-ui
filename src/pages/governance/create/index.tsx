import { NextPage } from "next";
import { withLayout } from "@moxy/next-layout";

import { Box } from "@mui/material";
import { Layout } from "components/common";

const CreateProposalPage: NextPage = () => {
  return (
    <Box>Hello!</Box>
  );
};

export default withLayout(<Layout />)(CreateProposalPage);