import { Box, Typography } from '@mui/material';
import { HistoryComponentStyle } from './index.style';
import { SwapIcon } from 'imgs/icons';

const transactions = [
  {
    time: 'January 15th 2023 at 3:25pm',
  },
  {
    time: 'January 15th 2023 at 3:25pm',
  },
  {
    time: 'January 15th 2023 at 3:25pm',
  },
  {
    time: 'January 15th 2023 at 3:25pm',
  },
  {
    time: 'January 15th 2023 at 3:25pm',
  },
];

export const HistoryComponent: React.FC = () => {

  return (
    <HistoryComponentStyle>
      <Typography variant="h4">History</Typography>
      <Box className="transaction-list">
        {
          transactions.map((transaction, index) => (
            <Box
              className="transaction-item"
              key={index}
            >
              <Typography variant="body2">{transaction.time}</Typography>
              <Box className="transaction-item-main">
                <Box className="transaction-type-icon">
                  <SwapIcon />
                </Box>
                <Box className="transaction-summary">
                  <Box className="transaction-values">
                    <Typography variant="body2">Swap LSK for ETH</Typography>
                    <Typography variant="body2">5.24 LSK</Typography>
                  </Box>
                  <Box className="transaction-status">
                    <Typography variant="body2">Confirmed</Typography>
                    <Typography variant="body2">$7.52</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))
        }
      </Box>
    </HistoryComponentStyle >
  );
};