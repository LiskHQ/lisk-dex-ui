import Image from "next/image";
import cn from "classnames";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, IconButton, Typography } from "@mui/material"
import { Chart, InputComponent, SelectTokenModal } from "components"
import { PlusCircleIcon, SettingIcon } from "imgs/icons"
import { IToken } from "models"
import { useState } from "react"
import { mockTokens } from "__mock__"
import { SupplyLiquidityStyle } from "./index.style"
import { DepositAmount } from "./DepositAmount";
import { FeeTiers } from "./FeeTiers";
import { PriceRange } from "./PriceRange";

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

export const SupplyLiquidity: React.FC = () => {

  const [openSelectToken1, setOpenSelectToken1] = useState<boolean>(false);
  const [openSelectToken2, setOpenSelectToken2] = useState<boolean>(false);

  const [token1, setToken1] = useState<IToken>();
  const [token2, setToken2] = useState<IToken>();

  const [tierValue, setTierValue] = useState<number>();

  const [minPrice, setMinPrice] = useState<number>(0.0);
  const [maxPrice, setMaxPrice] = useState<number>(0.0);

  const onSelectToken = (token: IToken) => {
    openSelectToken1 && setToken1(token);
    openSelectToken2 && setToken2(token);
  }

  const onCloseSelectToken = () => {
    setOpenSelectToken1(false);
    setOpenSelectToken2(false);
  }

  return (
    <SupplyLiquidityStyle>
      <Box className="supply-liquidity-title">
        <Typography variant="h4">Supply Liquidity</Typography>
        <Box className="supply-liquidity-actions">
          <Typography variant="body2">clear</Typography>
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
            className={
              cn({
                "select-token": true,
                "selected": !!token1,
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
            className={
              cn({
                "select-token": true,
                "selected": !!token2,
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

      <InputComponent
        className="supply-liquidity-initial-price"
        type="number"
        label="Set Initial Price"
      />

      <Box className="supply-liquidity-select-fee-tier">
        <Typography variant="body2">Select fee tier</Typography>
        <FeeTiers tierValue={tierValue} onChange={(value) => { setTierValue(value) }} />
      </Box>

      <Chart
        data={chartData}
      />

      <Box className="supply-liquidity-set-price-range">
        <Box className="set-price-range-title">
          <Typography variant="body2">Set price range</Typography>
          <Typography className="full-range" variant="body2">Full range</Typography>
        </Box>
        <Box className="set-price-range">
          <PriceRange
            label="Min Price"
            price={minPrice}
            onChange={(value) => { setMinPrice(minPrice); }}
          />
          <PriceRange
            label="Max Price"
            price={maxPrice}
            onChange={(value) => { setMaxPrice(minPrice); }}
          />
        </Box>
      </Box>

      <Box className="deposit-amounts">
        <Typography variant="body2">Deposit amounts</Typography>
        <DepositAmount token={token1} />
        <DepositAmount token={token2} />
      </Box>

      {
        (openSelectToken1 || openSelectToken2) &&
        <SelectTokenModal
          tokens={mockTokens}
          onSelect={onSelectToken}
          onClose={onCloseSelectToken}
        />
      }
    </SupplyLiquidityStyle >
  )
}