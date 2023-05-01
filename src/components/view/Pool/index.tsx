import { Grid } from "@mui/material"
import { IPool } from "models"
import { PoolViewStyle } from "./index.style"
import { LiskDexLP } from "./LiskDexLP"
import { SupplyLiquidity } from "./SupplyLiquidity"

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

  return (
    <PoolViewStyle>
      <Grid container spacing={3}>
        <Grid item lg={5.5} md={12} sm={12} xs={12}>
          <SupplyLiquidity
            sendingTransaction={sendingTransaction}
            onCofirmSupplyLiquidity={onConfirmSupplyLiquidity}
            closeTransactionModal={closeTransactionModal}
          />
        </Grid>
        <Grid item lg={6.5} md={12} sm={12} xs={12}>
          <LiskDexLP
            pools={pools}
            gotPools={gotPools}
            gettingPools={gettingPools}
          />
        </Grid>
      </Grid>
    </PoolViewStyle>
  )
}