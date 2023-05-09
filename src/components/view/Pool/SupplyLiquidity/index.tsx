import Image from 'next/image';
import cn from 'classnames';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, IconButton, Typography } from '@mui/material';
import { ButtonComponent, InputComponent, SelectTokenModal } from 'components';
import { PlusCircleIcon, SettingIcon } from 'imgs/icons';
import { IPool, IToken } from 'models';
import { useEffect, useMemo, useState } from 'react';
import { mockTokens } from '__mock__';
import { SupplyLiquidityStyle } from './index.style';
import { DepositAmount } from './DepositAmount';
import { FeeTiers } from './FeeTiers';
import { PriceRange } from './PriceRange';
import { RangeSelector } from './RangeSelector';
import { SupplyLiquidityModal } from './SupplyLiquidityModal';

const chartData = [
  { x: 1.1, y: 50 },
  { x: 1.2, y: 100 },
  { x: 1.3, y: 120 },
  { x: 1.4, y: 440 },
  { x: 1.5, y: 40 },
  { x: 1.6, y: 130 },
  { x: 1.7, y: 240 },
  { x: 1.8, y: 435 },
  { x: 1.9, y: 333 },
  { x: 2.0, y: 223 },
];

export interface ISupplyLiquidityProps {
  sendingTransaction: boolean,
  closeTransactionModal: boolean,
  onCofirmSupplyLiquidity: (pool: IPool) => void,
}

export const SupplyLiquidity: React.FC<ISupplyLiquidityProps> = (props) => {

  const { sendingTransaction, closeTransactionModal, onCofirmSupplyLiquidity } = props;

  const [openSelectToken1, setOpenSelectToken1] = useState<boolean>(false);
  const [openSelectToken2, setOpenSelectToken2] = useState<boolean>(false);

  const [token1, setToken1] = useState<IToken | null>(null);
  const [token2, setToken2] = useState<IToken | null>(null);

  const [token1Amount, setToken1Amount] = useState<number>(0);
  const [token2Amount, setToken2Amount] = useState<number>(0);

  const [initialPrice, setInitialPrice] = useState<number>(0);
  const [tierValue, setTierValue] = useState<number>(0);

  const [minPrice, setMinPrice] = useState<number>(1.0);
  const [maxPrice, setMaxPrice] = useState<number>(2.0);

  const [openSupplyModal, setOpenSupplyModal] = useState<boolean>(false);

  const onSelectToken = (token: IToken) => {
    if (openSelectToken1) {
      if (token2 !== token)
        setToken1(token);
    }
    if (openSelectToken2) {
      if (token1 !== token)
        setToken2(token);
    }
  };

  const onCloseSelectToken = () => {
    setOpenSelectToken1(false);
    setOpenSelectToken2(false);
  };

  const onChangeRange = (range: number[]) => {
    setMinPrice(range[0]);
    setMaxPrice(range[1]);
  };

  const onClickFullRange = () => {
    setMinPrice(1.0);
    setMaxPrice(2.0);
  };

  const isValid = useMemo(() => {
    return (token1 && token2 && minPrice && maxPrice && token1Amount && token2Amount && initialPrice && tierValue);
  }, [token1, token2, minPrice, maxPrice, token1Amount, token2Amount, initialPrice, tierValue]);

  useEffect(() => {
    if (sendingTransaction) {
      setOpenSupplyModal(false);
    }
  }, [sendingTransaction]);

  useEffect(() => {
    setToken1(null);
    setToken2(null);

    setToken1Amount(0);
    setToken2Amount(0);

    setInitialPrice(0);
    setTierValue(0);

    setMinPrice(1.0);
    setMaxPrice(2.0);
  }, [closeTransactionModal]);

  return (
    <SupplyLiquidityStyle>
      <Box className="supply-liquidity-title">
        <Typography variant="h4">Supply Liquidity</Typography>
        <Box className="supply-liquidity-actions">
          <Typography variant="body2">Clear</Typography>
          <IconButton>
            <SettingIcon />
          </IconButton>
        </Box>
      </Box>
      <Typography>Start earning incentives on your liquidity</Typography>

      <Box className="supply-liquidity-select-pair">
        <Typography variant="body2">Select a pair</Typography>
        <Box className="supply-liquidity-token-selection">
          <Box
            data-testid="select-token1-test"
            className={
              cn({
                'select-token': true,
                'selected': !!token1,
              })
            }
            onClick={() => { setOpenSelectToken1(true); }}
          >
            {
              token1 ?
                <Box>
                  <Image src={token1.image} width={28} height={28} />
                  <Typography variant="subtitle1">{token1.shortName}</Typography>
                </Box> :
                <Typography variant="subtitle1">Select a token</Typography>
            }
            <FontAwesomeIcon icon={faChevronDown} />
          </Box>

          <Box className="plus-icon">
            <PlusCircleIcon />
          </Box>

          <Box
            data-testid="select-token2-test"
            className={
              cn({
                'select-token': true,
                'selected': !!token2,
              })
            }
            onClick={() => { setOpenSelectToken2(true); }}
          >
            {
              token2 ?
                <Box>
                  <Image src={token2.image} width={28} height={28} />
                  <Typography variant="subtitle1">{token2.shortName}</Typography>
                </Box> :
                <Typography variant="subtitle1">Select a token</Typography>
            }
            <FontAwesomeIcon icon={faChevronDown} />
          </Box>
        </Box>
      </Box>

      {
        !!token1 && !!token2 &&
        <InputComponent
          className="supply-liquidity-initial-price"
          data-testid="initial-price-input-test"
          type="number"
          label="Set Initial Price"
          onChange={(e) => { setInitialPrice(parseFloat(e.target.value)); }}
        />
      }

      <Box className="supply-liquidity-select-fee-tier">
        <Typography variant="body2">Select fee tier</Typography>
        <FeeTiers tierValue={tierValue as number} onChange={(value) => { setTierValue(value); }} />
      </Box>

      <RangeSelector
        data={chartData}
        defaultRange={[minPrice, maxPrice]}
        onChangeRange={onChangeRange}
        disabled={!token1 || !token2}
      />

      <Box className="supply-liquidity-set-price-range">
        <Box className="set-price-range-title">
          <Typography variant="body2">Set price range</Typography>
          <Typography className="full-range" variant="body2" onClick={onClickFullRange}>Full range</Typography>
        </Box>
        <Box className="set-price-range">
          <PriceRange
            label="Min Price"
            price={minPrice}
            onChange={(value) => { setMinPrice(value); }}
          />
          <PriceRange
            label="Max Price"
            price={maxPrice}
            onChange={(value) => { setMaxPrice(value); }}
          />
        </Box>
      </Box>

      <Box className="deposit-amounts">
        <Typography variant="body2">Deposit amounts</Typography>
        <DepositAmount
          token={token1 as IToken}
          tokenAmount={token1Amount}
          balance={4521.425}
          onChange={(value) => { setToken1Amount(value); }}
        />
        <DepositAmount
          token={token2 as IToken}
          tokenAmount={token2Amount}
          balance={7.282}
          onChange={(value) => { setToken2Amount(value); }}
        />
      </Box>

      <ButtonComponent
        data-testid="preview-button-test"
        onClick={() => { setOpenSupplyModal(true); }}
        disabled={!isValid}
      >
        <Typography variant="subtitle1">Preview</Typography>
      </ButtonComponent>

      {
        !(token1 && token2) &&
        <Box className="supply-liquidity-mask">
        </Box>
      }

      {
        (openSelectToken1 || openSelectToken2) &&
        <SelectTokenModal
          tokens={mockTokens}
          onSelect={onSelectToken}
          onClose={onCloseSelectToken}
        />
      }

      {
        openSupplyModal && isValid &&
        <SupplyLiquidityModal
          token1={token1 as IToken}
          token2={token2 as IToken}
          token1Amount={token1Amount}
          token2Amount={token2Amount}
          onClose={() => { setOpenSupplyModal(false); }}
          onConfirm={onCofirmSupplyLiquidity}
        />
      }
    </SupplyLiquidityStyle >
  );
};