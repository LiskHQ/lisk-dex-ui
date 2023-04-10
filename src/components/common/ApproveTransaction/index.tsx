import Image from "next/image";
import { Box, FormLabel, Typography } from "@mui/material";
import { ButtonComponent } from "components/common";
import { CancelIcon, LightcurveIcon } from "imgs/icons";
import AvatarImg from "imgs/avatar.png";
import { ellipsisAddress } from "utils";
import { ApproveTransactionModalStyle } from "./index.style";

export interface IApproveTransactionModalProps {
  approvingTransaction: boolean,
  onClose?: () => void,
  onConfirm?: () => void,
}

export const ApproveTransactionModal: React.FC<IApproveTransactionModalProps> = (props) => {
  const { approvingTransaction, onConfirm, onClose } = props;

  return (
    <ApproveTransactionModalStyle>
      <Box className="approve-transaction-background"></Box>
      <Box className="approve-transaction-modal-container">
        <Box className="approve-transaction-modal-header">
          <Typography variant="h4">Approve transaction</Typography>

          <Box className="approve-transaction-status">
            <Box className="transaction-status">
              <Box className="status"></Box>
              <Typography variant="h5">Lisk Testnet</Typography>
            </Box>
            <CancelIcon onClick={() => { onClose && onClose(); }}></CancelIcon>
          </Box>
        </Box>

        <Box className="approve-transaction-modal-body">
          <Typography variant="body1">This action will approve this transaction.</Typography>

          <Box className="approve-transaction-wallet-info">
            <Box className="approve-transaction-account">
              <FormLabel>Account:</FormLabel>
              <Box className="approve-transaction-account-address">
                <Image src={AvatarImg} />
                <Typography variant="body1">{ellipsisAddress("0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1")}</Typography>
              </Box>
            </Box>
            <Box className="approve-transaction-balance">
              <FormLabel>Balance:</FormLabel>
              <Box className="approve-transaction-balance-amount">
                <LightcurveIcon />
                <Typography variant="body1">145,321 LSKDEX (~$136,461)</Typography>
              </Box>
            </Box>
          </Box>

          <Box className="approve-transaction-estimated-balance-change">
            <Typography variant="h5">Estimated balance change</Typography>
            <Box className="approve-transaction-estimated-balance">
              <Typography variant="h5">LSK:</Typography>
              <Typography className="estimated-balance" variant="h5">-5000 LSK</Typography>
            </Box>
          </Box>

          <Box className="approve-transaction-request">
            <LightcurveIcon />
            <Typography variant="h4">Approve request</Typography>
            <Typography variant="body1">https://liskdex.io</Typography>
          </Box>

          <Typography variant="subtitle1">Transaction Summary</Typography>

          <Box className="approve-transaction-proposal-creation-fee">
            <Typography variant="body1">Proposal creation fee:</Typography>
            <Typography variant="body1">5000 LSKDEX (~$4952.42)</Typography>
          </Box>

          <Box className="approve-transaction-proposal-transaction-total">
            <Typography variant="subtitle2">Transaction total:</Typography>
            <Typography variant="subtitle2">5000 LSKDEX (~$4952.42)</Typography>
          </Box>
        </Box>

        <Box className="approve-transaction-modal-footer">
          <ButtonComponent
            className="approve-transaction-modal-cancel"
            variant="text"
            onClick={() => { onClose && onClose(); }}
          >
            <Typography variant="body1">Cancel</Typography>
          </ButtonComponent>
          <ButtonComponent
            className="approve-transaction-modal-confirm"
            loading={approvingTransaction}
            onClick={() => { onConfirm && onConfirm(); }}
          >
            <Typography variant="body1">Send wallet request</Typography>
          </ButtonComponent>
        </Box>
      </Box>
    </ApproveTransactionModalStyle>
  )
}
