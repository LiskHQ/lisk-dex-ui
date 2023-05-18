import { Box, Typography } from '@mui/material';
import { LoaderComponent } from 'components/common';
import { IPool } from 'models';
import { LiskDexLPStyle } from './index.style';
import { PoolComponent } from './PoolComponent';

export interface ILiskDexLProps {
  pools: IPool[],
  gettingPools: boolean,
  gotPools: boolean,
}

export const LiskDexLP: React.FC<ILiskDexLProps> = (props) => {

  const { pools, gettingPools, gotPools } = props;

  return (
    <LiskDexLPStyle>
      <Box className="lisk-dex-lp-title">
        <Typography variant="h4">Your LiskDEX LP {gotPools && pools.length > 0 && `(${pools.length})`}</Typography>
      </Box>
      <Box className="lisk-dex-lp-main">
        {
          gotPools && pools.length > 0 ?
            pools.map((pool, index) => (
              <PoolComponent key={index} pool={pool} />
            )) :
            gettingPools ?
              <LoaderComponent /> :
              <Typography variant="body1">You do not have any liquidity positions.</Typography>
        }
      </Box>
    </LiskDexLPStyle >
  );
};