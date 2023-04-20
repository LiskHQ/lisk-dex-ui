import { Grid } from "@mui/material"
import { PoolViewStyle } from "./index.style"
import { LiskDexLP } from "./LiskDexLP"
import { SupplyLiquidity } from "./SupplyLiquidity"

export const PoolView: React.FC = () => {
  return (
    <PoolViewStyle>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <SupplyLiquidity />
        </Grid>
        <Grid item md={6}>
          <LiskDexLP />
        </Grid>
      </Grid>
    </PoolViewStyle>
  )
}