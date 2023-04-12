import { Box, FormControl, FormControlLabel, RadioGroup, Typography } from "@mui/material"
import {
  ButtonComponent,
  RadioComponent
} from "components"
import { VoteType } from "consts"
import { LiskIcon } from "imgs/icons"
import { ChangeEvent, useState } from "react"
import { VoteModalStyle } from "./index.style"

export interface IVoteModalProps {
  openTransactionApproval?: boolean,
  type?: VoteType,
  onClose: () => void,
  onVote: (value: VoteType) => void,
}

export const VoteModal: React.FC<IVoteModalProps> = (props) => {
  const { openTransactionApproval, type, onClose, onVote } = props;
  const [value, setValue] = useState<VoteType | null>(type || null);

  const onChange = (event: ChangeEvent<HTMLInputElement>, value: string) => {
    setValue(value);
  }

  return (
    <VoteModalStyle data-testid="vote-modal-test">
      <Box className="vote-modal-background" />
      <Box className="vote-modal-container">
        <Box className="vote-modal-header">
          <Typography variant="h4">
            {`${!type ? "Cast your vote" : "Recast your vote"}`}
          </Typography>
        </Box>
        <Box className="vote-modal-body">
          <Box className="vote-modal-voting-power">
            <Typography variant="body2">Your voting power:</Typography>
            <Box className="vote-modal-voting-power-dex">
              <LiskIcon />
              <Typography variant="body2">42 LSKDEX</Typography>
            </Box>
          </Box>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={value}
              onChange={onChange}
            >
              <FormControlLabel data-testid="vote-modal-radio" value={VoteType.Yes} control={<RadioComponent />} label="Yes" />
              <FormControlLabel value={VoteType.No} control={<RadioComponent />} label="No" />
              <FormControlLabel value={VoteType.Pass} control={<RadioComponent />} label="Pass" />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box className="vote-modal-footer">
          <ButtonComponent
            data-testid="vote-modal-close-button-test"
            className="vote-modal-cancel"
            variant="text"
            onClick={() => { onClose(); }}
          >
            <Typography variant="body1">Cancel</Typography>
          </ButtonComponent>
          <ButtonComponent
            data-testid="vote-modal-button-test"
            className="vote-modal-confirm"
            loading={openTransactionApproval}
            onClick={() => { onVote(value as VoteType); }}
            disabled={!value || value === type}
          >
            <Typography variant="body1">{`${!type ? "Vote" : "Revote"}`}</Typography>
          </ButtonComponent>
        </Box>
      </Box>
    </VoteModalStyle>
  )
}