import Image from 'next/image';
import { Box, Typography } from "@mui/material";
import { chainSvgs } from "imgs/chains";
import { IPoolItem } from 'models';
import { PoolItemStyle } from "./index.style";

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
              <Box className="pool-item-chain1">
                <Image src={chainSvgs[data.chain1]} />
              </Box>
              <Box className="pool-item-chain2">
                <Image src={chainSvgs[data.chain2]} />
              </Box>
              <Typography className="pool-item-title" variant="body2">{data.chain1}-{data.chain2}</Typography>
              <Box className="pool-item-rate"><Typography variant="body2">{data.rate}%</Typography></Box>
            </Box>
            <Typography className="pool-item-amount" variant="body2">${data.amount}m</Typography>
          </>
          :
          <Typography className="pool-item-title" variant="body2">Select a pool ID</Typography>
      }
    </PoolItemStyle>
  )
}
