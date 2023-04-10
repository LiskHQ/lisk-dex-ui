import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Typography } from "@mui/material";

import { ProposalViewStyle } from "./index.style";
import { IProposal } from "models";

export interface IProposalViewProps {
}

export const ProposalView: React.FC<IProposalViewProps> = (props) => {
  return (
    <ProposalViewStyle>
      <Box className="create-proposal-path">
        <Typography variant="h5">Home</Typography>
        <FontAwesomeIcon icon={faChevronRight} />
        <Typography variant="h5">Governance</Typography>
        <FontAwesomeIcon icon={faChevronRight} />
        <Typography variant="h5">Proposal</Typography>
      </Box>
    </ProposalViewStyle>
  );
}