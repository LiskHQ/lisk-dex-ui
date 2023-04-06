import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Typography } from "@mui/material";
import { InputComponent } from "components";
import { CreateProposalViewStyle } from "./index.style";

export const CreateProposalView: React.FC = () => {
  return (
    <CreateProposalViewStyle>
      <Box className="create-proposal-path">
        <Typography variant="h5">Home</Typography>
        <FontAwesomeIcon icon={faChevronRight} />
        <Typography variant="h5">Governance</Typography>
        <FontAwesomeIcon icon={faChevronRight} />
        <Typography variant="h5">Create a Proposal</Typography>
      </Box>
      <Box className="create-proposal">
        <Box className="create-proposal-header">
          <Typography className="create-proposal-title" variant="h3">Create proposal</Typography>
          <Typography className="create-proposal-description" variant="body1">
            Choose the type of proposal and fill in the fields to submit a proposal.<br />
            To create a proposal, you need a minimum of <span>100,000</span> DEX Tokens to be eligible to create one.
          </Typography>
        </Box>
        <Box className="create-proposal-body">
          <InputComponent />
        </Box>
      </Box>
    </CreateProposalViewStyle>
  );
}