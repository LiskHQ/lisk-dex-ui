
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import { useRef } from "react";
import { mockPoolDetails } from "__mock__";
import { FeaturedPoolsStyle } from './index.style';


export const FeaturedPools: React.FC = () => {
  const poolContainerRef = useRef<HTMLDivElement>(null);

  const onClickScrollLeft = () => {
    if (poolContainerRef.current)
      poolContainerRef.current.scrollLeft -= 332;
  }

  const onClickScrollRight = () => {
    if (poolContainerRef.current)
      poolContainerRef.current.scrollLeft += 332;
  }

  return (
    <FeaturedPoolsStyle className="featured-pools">
      <IconButton className="scroll-button left" onClick={onClickScrollLeft}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </IconButton>
      <Box className="feature-pools-container" ref={poolContainerRef}>
        {
          mockPoolDetails.map((el, index) => (
            <Box key={index} className="pool-box">
              <Box className="pool-box-inner">
                <Box className="pool-tokens">
                  <Box className="token1-image">
                    <Image src={el.token1.image} width={48} height={48} />
                  </Box>
                  <Box className="token2-image">
                    <Image src={el.token2.image} width={48} height={48} />
                  </Box>
                  <Box className="token-name">
                    <Typography variant="h4">{el.token1.shortName}</Typography>
                    <Typography variant="h4">{el.token2.shortName}</Typography>
                  </Box>
                </Box>

                <Box className="pool-summary">
                  <Box className="pool-apy">
                    <Typography className="pool-summary-title" variant="body2">APY</Typography>
                    <Typography variant="body2">{el.APY}%</Typography>
                  </Box>
                  <Box className="pool-liquidity">
                    <Typography className="pool-summary-title" variant="body2">Pool Liquidity</Typography>
                    <Typography variant="body2">${el.volume}</Typography>
                  </Box>
                  <Box className="pool-apy">
                    <Typography className="pool-summary-title" variant="body2">Fees (7d)</Typography>
                    <Typography variant="body2">{el.fees}</Typography>
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
  )
}