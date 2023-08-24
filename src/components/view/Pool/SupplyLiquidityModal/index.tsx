import Image from 'next/image';
import { Box, IconButton, Typography } from '@mui/material';
import {
  ButtonComponent,
} from 'components';
import { CancelIcon, LightIcon, tokenSvgs } from 'imgs/icons';
import { SupplyLiquidityStyle } from './index.style';
import { ICreatePool } from 'models';
import { useState } from 'react';
import { TransactionCommands } from 'consts';

export interface ISupplyLiquidityModalProps {
  pool: ICreatePool,
  moduleCommand: string,
  onClose: () => void,
  onConfirm: () => void,
}

export const SupplyLiquidityModal: React.FC<ISupplyLiquidityModalProps> = (props) => {
  const { pool, moduleCommand, onClose, onConfirm } = props;

  const [isLoading, setLoading] = useState<boolean>(false);

  const onClickConfirm = () => {
    setLoading(true);
    onConfirm();
  };
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
              <Image src={tokenSvgs[pool.token1.symbol]} width={48} height={48} />
              <Image src={tokenSvgs[pool.token2.symbol]} width={48} height={48} />
            </Box>
            <Typography variant="body1">Supplying {pool.token1Amount} {pool.token1.symbol} and {pool.token2Amount} {pool.token2.symbol}</Typography>
            <Typography variant="body1">You will receive 3.45 {pool.token1.symbol}/{pool.token2.symbol} LP Tokens</Typography>
          </Box>
        </Box>
        <Box className="supply-liquidity-modal-body">
          <Box className="deposit-property">
            <Typography variant="body1">{pool.token1.symbol} Deposited:</Typography>
            <Box className="deposit-property-amount">
              <Image src={tokenSvgs[pool.token1.symbol]} width={24} height={24} />
              <Typography variant="body1">{pool.token1Amount}</Typography>
            </Box>
          </Box>
          <Box className="deposit-property">
            <Typography variant="body1">{pool.token2.symbol} Deposited:</Typography>
            <Box className="deposit-property-amount">
              <Image src={tokenSvgs[pool.token2.symbol]} width={24} height={24} />
              <Typography variant="body1">{pool.token2Amount}</Typography>
            </Box>
          </Box>
          <Box className="deposit-property">
            <Typography variant="body1">Share of pool:</Typography>
            <Typography variant="body1">
              {
                moduleCommand === TransactionCommands.createPool ?
                  '100%' :
                  '0.09%'
              }
            </Typography>
          </Box>
          <Typography
            className="deposit-description"
            variant="body1"
          >
            {
              moduleCommand === TransactionCommands.createPool ?
                'When creating a new pool you are the first liquidity provider. The ratio of tokens added will determine the price of the pool.' :
                'Output is estimated. If the price changes by more than 0.5% your transaction will revert.'

            }
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
  );
};