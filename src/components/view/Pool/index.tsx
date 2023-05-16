import { Grid } from "@mui/material"
import { IPool } from "models"
import { useEffect, useState } from "react"
import { PoolViewStyle } from "./index.style"
import { LiskDexLP } from "./LiskDexLP"
import { SupplyLiquidity } from "./SupplyLiquidity"
import { SupplyLiquidityModal } from "./SupplyLiquidity/SupplyLiquidityModal"

export interface IPoolViewProps {
  sendingTransaction: boolean,
  pools: IPool[],
  gettingPools: boolean,
  gotPools: boolean,
  closeTransactionModal: boolean,
  onConfirmSupplyLiquidity: (pool: IPool) => void,
}

export const PoolView: React.FC<IPoolViewProps> = (props) => {
  const {
    sendingTransaction,
    pools,
    gotPools,
    gettingPools,
    closeTransactionModal,
    onConfirmSupplyLiquidity
  } = props;

  const [openSupplyModal, setOpenSupplyModal] = useState<boolean>(false);
  const [pool, setPool] = useState<IPool>();

  const onPreview = (pool: IPool) => {
    setOpenSupplyModal(true);
    setPool(pool);
  }

  useEffect(() => {
    if (sendingTransaction) {
      setOpenSupplyModal(false);
    }
  }, [sendingTransaction]);

  return (
    <PoolViewStyle>
      <Grid container spacing={3}>
        <Grid item lg={5.5} md={12} sm={12} xs={12}>
          <SupplyLiquidity
            onPreview={onPreview}
            closeTransactionModal={closeTransactionModal}
          />
        </Grid>
        <Grid item lg={6.5} md={12} sm={12} xs={12}>
          <LiskDexLP
            pools={pools}
            gotPools={gotPools}
            gettingPools={gettingPools}
            onPreview={onPreview}
          />
        </Grid>
      </Grid>
      {
        openSupplyModal && pool &&
        <SupplyLiquidityModal
          pool={pool}
          onClose={() => { setOpenSupplyModal(false) }}
          onConfirm={onConfirmSupplyLiquidity}
        />
      }
    </PoolViewStyle>
  )
}