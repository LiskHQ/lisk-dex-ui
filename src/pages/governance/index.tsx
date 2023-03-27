import { NextPage } from "next";
import { withLayout } from "@moxy/next-layout";
import { Box, Container, Typography } from "@mui/material";

import General from "../../components/layout/public/general";
import BankIcon from "imgs/icons/BankIcon";
import { GovernanceStyle } from "styles/pages";

const Governanace = () => {
  return (
    <GovernanceStyle>
      <Container maxWidth="lg">
        <Box className="governance-title">
          <Typography variant="h2">
            Governance
          </Typography>
          <BankIcon />
        </Box>
      </Container>
    </GovernanceStyle>
  );
};

export default withLayout(<General />)(Governanace);