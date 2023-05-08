import Image from "next/image";
import { Box, IconButton, Typography } from "@mui/material";
import {
  ButtonComponent,
} from "components";
import { CancelIcon, LightIcon } from "imgs/icons";
import { SupplyLiquidityStyle } from "./index.style";
import { IPool, IToken } from "models";
import { useState } from "react";

export interface ISupplyLiquidityModalProps {
  token1: IToken,
  token1Amount: number,
  token2: IToken,
  token2Amount: number,
  onClose: () => void,
  onConfirm: (pool: IPool) => void,
}

export const SupplyLiquidityModal: React.FC<ISupplyLiquidityModalProps> = (props) => {
  const { token1, token1Amount, token2, token2Amount, onClose, onConfirm } = props;

  const [isLoading, setLoading] = useState<boolean>(false);

  const onClickConfirm = () => {
    setLoading(true);
    onConfirm({
      token1,
      token2,
      token1Amount,
      token2Amount,
      share: 0.09,
    });
  }
  return (
    <SupplyLiquidityStyle data-testid="supply-liquidity-modal-test">
      <Box className="supply-liquidity-modal-background" />
      <Box className="supply-liquidity-modal-container">
        <Box className="supply-liquidity-modal-header">
          <LightIcon className="light-icon data-index-1"></LightIcon>
          <LightIcon className="light-icon data-index-2"></LightIcon>
          <LightIcon className="light-icon data-index-3"></LightIcon>
          <LightIcon className="light-icon data-index-4"></LightIcon>
          <LightIcon className="light-icon data-index-5"></LightIcon>
          <LightIcon className="light-icon data-index-6"></LightIcon>

          <Box className="supply-liquidity-modal-title">
            <Typography variant="h4">Supplying Liquidity</Typography>
            <IconButton data-testid="supply-liquidity-modal-cancel-test" onClick={onClose}>
              <CancelIcon />
            </IconButton>
          </Box>
          <Box className="supply-liquidity-modal-description">
            <Box>
              <Image src={token1.image} width={48} height={48} />
              <Image src={token2.image} width={48} height={48} />
            </Box>
            <Typography variant="body1">Supplying {token1Amount} {token1.shortName} and {token2Amount} {token2.shortName}</Typography>
            <Typography variant="body1">You will receive 3.45 {token1.shortName}/{token2.shortName} LP Tokens</Typography>
          </Box>
        </Box>
        <Box className="supply-liquidity-modal-body">
          <Box className="deposit-property">
            <Typography variant="body1">{token1.shortName} Deposited:</Typography>
            <Box className="deposit-property-amount">
              <Image src={token1.image} width={24} height={24} />
              <Typography variant="body1">{token1Amount}</Typography>
            </Box>
          </Box>
          <Box className="deposit-property">
            <Typography variant="body1">{token2.shortName} Deposited:</Typography>
            <Box className="deposit-property-amount">
              <Image src={token2.image} width={24} height={24} />
              <Typography variant="body1">{token2Amount}</Typography>
            </Box>
          </Box>
          <Box className="deposit-property">
            <Typography variant="body1">Share of pool:</Typography>
            <Typography variant="body1">0.09%</Typography>
          </Box>
          <Typography
            className="deposit-description"
            variant="body1"
          >
            Output is estimated. If the price changes by more than 0.5% your transaction will revert.
          </Typography>
          <ButtonComponent
            data-testid="supply-liquidity-modal-button-test"
            className="supply-liquidity-modal-confirm"
            loading={isLoading}
            onClick={onClickConfirm}
          >
            <Typography variant="body1">Go to Confirm</Typography>
          </ButtonComponent>
        </Box>
      </Box>
    </SupplyLiquidityStyle>
  )
}