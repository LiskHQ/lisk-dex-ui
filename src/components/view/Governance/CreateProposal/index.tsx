import { useState } from "react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Grid, MenuItem, Typography } from "@mui/material";
import { DropdownComponent, InputComponent } from "components";
import { ProposalType } from "consts";
import { CreateProposalViewStyle } from "./index.style";
import { SelectProposalTypeComponent } from "./SelectProposalType";
import { IncentivizationProposal } from "./IncentivizationProposal";

export const CreateProposalView: React.FC = () => {
  const [proposalType, setProposalType] = useState<ProposalType>();

  const onChangeProposalType = (value: ProposalType) => {
    setProposalType(value);
  }

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
          <Box className="proposal-author-box">
            <InputComponent
              label="Author"
              placeholder="author name, organization or foundation name"
            />
          </Box>
          <Box className="proposal-info-box">
            <SelectProposalTypeComponent
              label="Select a proposal type"
              onChange={onChangeProposalType}
            />
            {
              <IncentivizationProposal className="proposal-incentivization" />
            }
          </Box>
        </Box>
      </Box>
    </CreateProposalViewStyle>
  );
}