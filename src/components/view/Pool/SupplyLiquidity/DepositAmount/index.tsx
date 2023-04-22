import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { IToken } from "models";
import { DepositAmountStyle } from "./index.style";
import { useEffect, useState } from "react";

export interface IDepositAmountProps {
  balance: number,
  tokenAmount: number,
  token?: IToken,
  onChange: (amount: number) => void,
}

export const DepositAmount: React.FC<IDepositAmountProps> = (props) => {
  const { balance, token, tokenAmount, onChange } = props;

  const [amount, setAmount] = useState<number>(tokenAmount);

  useEffect(() => {
    onChange(amount);
  }, [amount]);

  useEffect(() => {
    setAmount(tokenAmount);
  }, [tokenAmount]);

  return (
    <DepositAmountStyle className="deposit-amount">
      <Box className="token-amount">
        {
          token ?
            <Box className="selected-token">
              <Image src={token.image} width={28} height={28} />
              <Typography variant="subtitle1">{token.shortName}</Typography>
            </Box>
            :
            <Box className="select-tokens">
              <Typography variant="subtitle1">Select tokens</Typography>
            </Box>
        }
        <Typography variant="subtitle2">{amount.toPrecision(4)}</Typography>
      </Box>
      {
        !!token &&
        <Box className="token-balance-details">
          <Typography variant="body2">Balance: {balance}</Typography>
          <Box className="token-balance-percent token">
            <Typography data-testid="token-balance-percent-25" variant="body2" onClick={() => { setAmount(balance / 4) }}>25%</Typography>
            <Typography data-testid="token-balance-percent-50" variant="body2" onClick={() => { setAmount(balance / 2) }}>50%</Typography>
            <Typography data-testid="token-balance-percent-max" variant="body2" onClick={() => { setAmount(balance) }}>MAX</Typography>
          </Box>
        </Box>
      }
    </DepositAmountStyle>
  )
}