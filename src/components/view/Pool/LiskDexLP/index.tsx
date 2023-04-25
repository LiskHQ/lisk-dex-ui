import { Box, Typography } from "@mui/material"
import { LoaderComponent } from "components/common";
import { IPool } from "models"
import { useState } from "react";
import { IncreaseLiquidityModal } from "./IncreaseLiquidityModal";
import { LiskDexLPStyle } from "./index.style"
import { PoolComponent } from "./PoolComponent";

export interface ILiskDexLProps {
  pools: IPool[],
  gettingPools: boolean,
  gotPools: boolean,
  onPreview: (pool: IPool) => void,
}

export const LiskDexLP: React.FC<ILiskDexLProps> = (props) => {

  const { pools, gettingPools, gotPools, onPreview } = props;
  const [openIncreaseLiquidityModal, setOpenIncreaseLiquidityModal] = useState<boolean>(false);
  const [pool, setPool] = useState<IPool>();

  const onIncreaseLiquidity = (pool: IPool) => {
    setOpenIncreaseLiquidityModal(true);
    setPool(pool);
  }

  const onRemoveLiquidity = (pool: IPool) => {
    setPool(pool);
  }

  return (
    <LiskDexLPStyle>
      <Box className="lisk-dex-lp-title">
        <Typography variant="h4">Your LiskDEX LP {gotPools && pools.length > 0 && `(${pools.length})`}</Typography>
      </Box>
      <Box className="lisk-dex-lp-main">
        {
          gotPools && pools.length > 0 ?
            pools.map((el, index) => (
              <PoolComponent
                key={index}
                pool={el}
                onIncreaseLiquidity={onIncreaseLiquidity}
                onRemoveLiquidity={onRemoveLiquidity}
              />
            )) :
            gettingPools ?
              <LoaderComponent /> :
              <Typography variant="body1">You do not have any liquidity positions.</Typography>
        }
      </Box>
      {
        openIncreaseLiquidityModal && pool &&
        <IncreaseLiquidityModal
          pool={pool}
          onClose={() => { setOpenIncreaseLiquidityModal(false); }}
          onPreview={onPreview}
        />
      }
    </LiskDexLPStyle >
  )
}