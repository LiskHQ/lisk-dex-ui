import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { IToken } from "models";
import { DepositAmountStyle } from "./index.style";

export interface IDepositAmountProps {
  token?: IToken,
}

export const DepositAmount: React.FC<IDepositAmountProps> = (props) => {
  const { token } = props;

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
        <Typography variant="subtitle2">0</Typography>
      </Box>
      {
        !!token &&
        <Box className="token-balance-details">
          <Typography variant="body2">Balance: 4521.25</Typography>
          <Box className="token-balance-percent token">
            <Typography data-testid="token-balance-percent-25" variant="body2" onClick={() => { }}>25%</Typography>
            <Typography data-testid="token-balance-percent-50" variant="body2" onClick={() => { }}>50%</Typography>
            <Typography data-testid="token-balance-percent-max" variant="body2" onClick={() => { }}>MAX</Typography>
          </Box>
        </Box>
      }
    </DepositAmountStyle>
  )
}