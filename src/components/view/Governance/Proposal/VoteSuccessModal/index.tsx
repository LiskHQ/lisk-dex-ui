import { Box, Typography } from "@mui/material"
import {
  ButtonComponent,
} from "components"
import { LiskIcon } from "imgs/icons"
import { VoteSuccessModalStyle } from "./index.style"

export interface IVoteSuccessModalProps {
  openTransactionApproval?: boolean,
  revote?: boolean,
  onClose: () => void,
}

export const VoteSuccessModal: React.FC<IVoteSuccessModalProps> = (props) => {
  const { openTransactionApproval, revote, onClose } = props;
  return (
    <VoteSuccessModalStyle data-testid="vote-success-modal-test">
      <Box className="vote-success-modal-background" />
      <Box className="vote-success-modal-container">
        <Box className="vote-success-modal-header">
          <Typography variant="h4">
            {`${!revote ? "Vote recasted" : "Revote casted"}`}
          </Typography>
        </Box>
        <Box className="vote-success-modal-body">
          <Box className="vote-success-modal-voting-power">
            <Typography variant="body2">You have successfully {`${!revote ? "voted" : "revoted"}`} </Typography>
            <Box className="vote-success-modal-voting-power-dex">
              <LiskIcon />
              <Typography variant="body2">42 LSKDEX</Typography>
            </Box>
          </Box>
        </Box>
        <Box className="vote-success-modal-footer">
          <ButtonComponent
            data-testid="vote-success-modal-close-test"
            className="vote-success-modal-confirm"
            loading={openTransactionApproval}
            onClick={() => { onClose(); }}
          >
            <Typography variant="body1">Close</Typography>
          </ButtonComponent>
        </Box>
      </Box>
    </VoteSuccessModalStyle>
  )
}