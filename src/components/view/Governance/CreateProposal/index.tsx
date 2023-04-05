import { useState } from "react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import { Box, Typography } from "@mui/material";

import { InputComponent } from "components";
import { ProposalType } from "consts";
import { CreateProposalViewStyle } from "./index.style";
import { SelectProposalTypeComponent } from "./SelectProposalType";
import { IncentivizationProposal } from "./IncentivizationProposal";
import { ButtonComponent } from "components/common/Button";
import { IProposal } from "models";

const schema = Yup.object().shape({
  title: Yup.string().required(),
  summary: Yup.string().required(),
  description: Yup.string().required(),
  link: Yup.string(),
});

export const CreateProposalView: React.FC = () => {
  const [proposalType, setProposalType] = useState<ProposalType>();
  const { register, handleSubmit, formState: { errors, isValid }, watch } = useForm<IProposal>({
    resolver: yupResolver(schema),
  });

  const onChangeProposalType = (value: ProposalType) => {
    setProposalType(value);
  }

  const onSubmitHandler = (data: IProposal) => {
    console.log(data);
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
          <Box component={'form'} onSubmit={handleSubmit(onSubmitHandler)}>
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
                proposalType === ProposalType.PoolIncentivization &&
                <IncentivizationProposal className="proposal-incentivization" />
              }
              <InputComponent
                name="title"
                className="proposal-title"
                label="Title"
                placeholder="Add title"
                maxLength={124}
                register={register}
                watch={watch}
              />
              <InputComponent
                name="summary"
                className="proposal-summary"
                label="Summary"
                placeholder="Add summary"
                multiline
                minRows={3}
                maxRows={3}
                maxLength={500}
                register={register}
                watch={watch}
              />
              <InputComponent
                name="description"
                className="proposal-description"
                label="Description"
                placeholder="Add description"
                multiline
                minRows={7}
                maxRows={7}
                maxLength={10240}
                register={register}
                watch={watch}
              />
              <InputComponent
                name="link"
                className="proposal-link"
                label="Discussions to"
                placeholder="Link"
                register={register}
                watch={watch}
              />
              <ButtonComponent
                type="submit"
                disabled={!isValid}
              >
                <Typography variant="body1">
                  Create Proposal (5000 LSK)
                </Typography>
              </ButtonComponent>
            </Box>
          </Box>
        </Box>
      </Box>
    </CreateProposalViewStyle>
  );
}