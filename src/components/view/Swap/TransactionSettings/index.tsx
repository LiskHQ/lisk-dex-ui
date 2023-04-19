import { Box, IconButton, Typography } from "@mui/material";
import { ButtonComponent, InputComponent } from "components/common";
import { CancelIcon, HelpIcon } from "imgs/icons";
import { ChangeEvent, useState } from "react";
import { TransactionSettingsStyle } from "./index.style";
import cn from "classnames";

export interface ITransactionSettingsProps {
  splipageTolerance: number,
  transactionDeadline: number,
  onSave: ({
    splipageTolerance,
    transactionDeadline
  }: {
    splipageTolerance: number,
    transactionDeadline: number,
  }) => void,
  onClose: () => void,
}

const splipageToleranceValues = [
  0.1,
  0.5,
  1,
];

export const TransactionSettings: React.FC<ITransactionSettingsProps> = (props) => {
  const { splipageTolerance: defaultSplipageTolerance, transactionDeadline: defaultTransactionDeadline, onSave, onClose } = props;

  const [splipageTolerance, setSplipageTolerance] = useState<number>(defaultSplipageTolerance);
  const [transactionDeadline, setTransactionDeadline] = useState<number>(defaultTransactionDeadline);

  const onChangeSplipageTolerance = (value: number) => {
    setSplipageTolerance(value);
  }

  const onClickSave = () => {
    onSave({ splipageTolerance, transactionDeadline })
  }
  return (
    <TransactionSettingsStyle>
      <Box className="transaction-settings-title">
        <Typography variant="h4">Transaction Settings</Typography>
        <IconButton
          data-testid="transaction-settings-cancel-test"
          onClick={onClose}
        >
          <CancelIcon />
        </IconButton>
      </Box>
      <Box className="transaction-settings-main">
        <Typography className="transactioin-settings-slipage-tolerance" variant="body1">Slippage Tolerance <HelpIcon /></Typography>
        <Box className="transaction-settings-slipage-tolerance-switcher">
          {
            splipageToleranceValues.map(value => (
              <Box
                key={value}
                className={
                  cn({
                    "switcher-box": true,
                    "selected": value === splipageTolerance,
                  })
                }
                onClick={() => { onChangeSplipageTolerance(value); }}
              >
                <Typography variant="body1">{value}%</Typography>
              </Box>
            ))
          }
          <InputComponent
            value="0.75%"
            disabled
          />
        </Box>

        <Typography className="transaction-deadline-label" variant="body1">Transaction deadline <HelpIcon /></Typography>
        <Box className="transaction-deadline-input">
          <InputComponent
            defaultValue={transactionDeadline}
            type="number"
            onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setTransactionDeadline(parseInt(e.target.value)); }}
          />
          <Typography variant="body2">minutes</Typography>
        </Box>

        <ButtonComponent
          data-testid="transaction-settings-save-test"
          onClick={onClickSave}
        >
          <Typography variant="h4">Save</Typography>
        </ButtonComponent>
      </Box>
    </TransactionSettingsStyle>
  )
}