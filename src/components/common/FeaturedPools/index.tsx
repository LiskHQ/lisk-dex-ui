
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, IconButton, Typography } from '@mui/material';
import Image from 'next/image';
import { useRef } from 'react';
import { mockPoolDetails } from '__mock__';
import { FeaturedPoolsStyle } from './index.style';
import { tokenSvgs } from 'imgs/icons';
import { getPoolToken0, getPoolToken1 } from 'utils';

export interface IFeaturedPoolsProps {
  onSelectPool?: (id: string) => void,
}

export const FeaturedPools: React.FC<IFeaturedPoolsProps> = (props) => {
  const { onSelectPool } = props;
  const poolContainerRef = useRef<HTMLDivElement>(null);

  const onClickScrollLeft = () => {
    if (poolContainerRef.current)
      poolContainerRef.current.scrollLeft -= 332;
  };

  const onClickScrollRight = () => {
    if (poolContainerRef.current)
      poolContainerRef.current.scrollLeft += 332;
  };

  return (
    <FeaturedPoolsStyle className="featured-pools">
      <IconButton className="scroll-button left" onClick={onClickScrollLeft}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </IconButton>
      <Box className="feature-pools-container" ref={poolContainerRef}>
        {
          mockPoolDetails.map((el, index) => (
            <Box
              key={index}
              data-testid={`feature-pool-item-${index}`}
              className="pool-box"
              onClick={() => { onSelectPool && onSelectPool(index.toString()); }}
            >
              <Box className="pool-box-inner">
                <Box className="pool-tokens">
                  <Box className="token1-image">
                    <Image src={tokenSvgs[getPoolToken0(el.poolName)]} width={48} height={48} />
                  </Box>
                  <Box className="token2-image">
                    <Image src={tokenSvgs[getPoolToken1(el.poolName)]} width={48} height={48} />
                  </Box>
                  <Box className="token-name">
                    <Typography variant="h4">{getPoolToken0(el.poolName)}</Typography>
                    <Typography variant="h4">{getPoolToken1(el.poolName)}</Typography>
                  </Box>
                </Box>

                <Box className="pool-detail">
                  <Box className="pool-apy">
                    <Typography className="pool-detail-title" variant="body2">APY</Typography>
                    <Typography className="pool-detail-value" variant="body2">{el.poolAPY}%</Typography>
                  </Box>
                  <Box className="pool-liquidity">
                    <Typography className="pool-detail-title" variant="body2">Pool Liquidity</Typography>
                    <Typography className="pool-detail-value" variant="body2">${el.poolVolume24H}</Typography>
                  </Box>
                  <Box className="pool-apy">
                    <Typography className="pool-detail-title" variant="body2">Fees (24H)</Typography>
                    <Typography className="pool-detail-value" variant="body2">{el.poolFees24H}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))
        }
      </Box>
      <IconButton className="scroll-button right" onClick={onClickScrollRight}>
        <FontAwesomeIcon icon={faChevronRight} />
      </IconButton>
    </FeaturedPoolsStyle >
  );
};