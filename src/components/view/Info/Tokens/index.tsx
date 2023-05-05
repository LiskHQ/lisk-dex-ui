import { Box, Typography } from '@mui/material';
import { InfoChart, PoolsTable, } from 'components';
import { TokensComponentStyle } from './index.style';

export const TokensComponent: React.FC = () => {
  return (
    <TokensComponentStyle>
      <Box className="info-header">
        <Typography variant="subtitle1">Tokens</Typography>
        <Typography variant="body1">Browse tokens on “dex”.</Typography>
      </Box>

      <Box className="table-title">
        <Typography variant="subtitle1">Saved Tokens</Typography>
      </Box>
      <InfoChart />

      <Box className="table-title">
        <Typography variant="subtitle1">All Pools</Typography>
      </Box>
      <PoolsTable />

    </TokensComponentStyle>
  );
};