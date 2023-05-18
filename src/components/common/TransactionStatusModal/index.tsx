import { TransactionStatusStyle } from "./index.style";
import { Box, CircularProgress, Link, Typography } from "@mui/material";
import { SuccessIcon } from "imgs/icons";
import { ButtonComponent } from "components/common";
import { useEffect, useState } from "react";
import { TransactionType } from "consts";

export interface ITransactionStatusModalProps {
  success?: boolean,
  type: TransactionType
  onClose?: () => void
}

export const TransactionStatusModal: React.FC<ITransactionStatusModalProps> = (props) => {
  const { success, type, onClose } = props;

  const [stateText, setStateText] = useState<string>('');

  useEffect(() => {
    if (type === TransactionType.SWAP) {
      setStateText('Swapping tokens...');
      if (success) {
        setStateText('Swap successful');
      }
    }
    if (type === TransactionType.SUPPLY_LIQUIDITY) {
      setStateText('Supplying liquidity...');
      if (success) {
        setStateText('Successfully supplied liquidity.');
      }
    }
    if (type === TransactionType.INCREASE_LIQUIDITY) {
      setStateText('Supplying liquidity...');
      if (success) {
        setStateText('Successfully increased liquidity.');
      }
    }
    if (type === TransactionType.REMOVE_LIQUIDITY) {
      setStateText('Removing liquidity...');
      if (success) {
        setStateText('Successfully removed liquidity.');
      }
    }
  }, [type, success]);


  return (
    <TransactionStatusStyle>
      <Box className="transaction-status-background" />
      <Box className="transaction-status-modal-container">
        <Typography variant="h3">
          {
            success ? "Transaction submitted" : "Waiting for Confirmation"
          }
        </Typography>
        {
          success ?
            <SuccessIcon className="transaction-status-icon" /> :
            <Box className="transaction-status-icon">
              <CircularProgress
                className="circular-progress background"
                variant="determinate"
                value={100}
                thickness={1}
              />
              <CircularProgress
                className="circular-progress foreground"
                thickness={1}
              />
            </Box>
        }
        <Typography className="transaction-status-content" variant="body1" >
          {stateText}
        </Typography>
        {
          success ?
            <>
              <Link>
                <Typography className="transaction-status-content" variant="body1" >View on Liskscan</Typography>
              </Link>
              <ButtonComponent
                data-testid="transaction-status-modal-close"
                onClick={() => { onClose && onClose(); }}
              >
                <Typography variant="body1">Close</Typography>
              </ButtonComponent>
            </>
            :
            <Typography className="confirm-transaction-wallet" variant="body2">Confirm this transaction in your wallet</Typography>
        }
      </Box>
    </TransactionStatusStyle >
  )
}
