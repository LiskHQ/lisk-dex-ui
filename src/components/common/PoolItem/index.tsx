import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import { IPoolItem } from 'models';
import { PoolItemStyle } from './index.style';
import { tokenSvgs } from 'imgs/icons';

interface IProps {
  data?: IPoolItem,
}

export const PoolItem: React.FC<IProps> = (props) => {
  const {
    data,
  } = props;

  return (
    <PoolItemStyle>
      {
        data ?
          <>
            <Box className="pool-item-left">
              <Box className="pool-item-token1">
                <Image src={tokenSvgs[data.token1]} />
              </Box>
              <Box className="pool-item-token2">
                <Image src={tokenSvgs[data.token2]} />
              </Box>
              <Typography className="pool-item-title" variant="body2">{data.token1}-{data.token2}</Typography>
              <Box className="pool-item-rate"><Typography variant="body2">{data.rate}%</Typography></Box>
            </Box>
            <Typography className="pool-item-amount" variant="body2">${data.amount}m</Typography>
          </>
          :
          <Typography className="pool-item-title" variant="body2">Select a pool ID</Typography>
      }
    </PoolItemStyle>
  );
};
