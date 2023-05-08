import Image from "next/image";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import { IPool } from "models";
import { PoolComponentStyle } from "./index.style";
import { PieChartIcon } from "imgs/icons";
import { ButtonComponent } from "components/common";

export interface IPoolComponentProps {
  pool: IPool,
}

export const PoolComponent: React.FC<IPoolComponentProps> = (props) => {
  const { pool } = props;

  return (
    <PoolComponentStyle>
      <AccordionSummary
        expandIcon={<FontAwesomeIcon icon={faChevronDown} />}
      >
        <Image src={pool.token1.image} width={24} height={24} />
        <Image src={pool.token2.image} width={24} height={24} />

        <Typography className="pool-summary-token-name" variant="body1">{pool.token1.shortName} / {pool.token1.shortName}</Typography>

        <Box className="pool-summary-rate">
          <Typography variant="body2">0.05</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box className="pool-details">
          <Box className="pool-details-info liquidity">
            <Typography variant="body1">Liquidity</Typography>
            <Typography variant="h2">$2,523</Typography>

            <Box className="pool-details-token token1">
              <Box className="pool-details-image">
                <Image src={pool.token1.image} width="20" height="20" />
                <Typography variant="body2">{pool.token1.shortName}</Typography>
              </Box>
              <Box className="pool-details-amount">
                <Typography variant="body2">{pool.token1Amount.toFixed(2)}</Typography>
                <Box>
                  <Typography variant="body2">55%</Typography>
                </Box>
              </Box>
            </Box>

            <Box className="pool-details-token token2">
              <Box className="pool-details-image">
                <Image src={pool.token2.image} width="20" height="20" />
                <Typography variant="body2">{pool.token2.shortName}</Typography>
              </Box>
              <Box className="pool-details-amount">
                <Typography variant="body2">{pool.token2Amount.toFixed(2)}</Typography>
                <Box>
                  <Typography variant="body2">55%</Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box className="pool-details-info fees-earned">
            <Typography variant="body1">Fees earned</Typography>
            <Typography variant="h2">$105.76</Typography>

            <Box className="pool-details-token token1">
              <Box className="pool-details-image">
                <Image src={pool.token1.image} width="20" height="20" />
                <Typography variant="body2">{pool.token1.shortName}</Typography>
              </Box>
              <Box className="pool-details-amount">
                <Typography variant="body2">0.034</Typography>
                <Typography variant="caption">($52.42)</Typography>
              </Box>
            </Box>

            <Box className="pool-details-token token2">
              <Box className="pool-details-image">
                <Image src={pool.token2.image} width="20" height="20" />
                <Typography variant="body2">{pool.token2.shortName}</Typography>
              </Box>
              <Box className="pool-details-amount">
                <Typography variant="body2">49.251</Typography>
                <Typography variant="caption">($53.98)</Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className="pool-share">
          <Box className="pool-share-title">
            <PieChartIcon />
            <Typography variant="body2">Your pool share:</Typography>
          </Box>
          <Box className="pool-share-percent">
            <Typography variant="body2">0.085%</Typography>
          </Box>
        </Box>

        <Box className="pool-buttons">
          <ButtonComponent
            className="remove-liquidity"
            variant="outlined"
          >
            <Typography variant="body1">- Remove Liquidity</Typography>
          </ButtonComponent>
          <ButtonComponent>
            <Typography variant="body1">+ Increase Liquidity</Typography>
          </ButtonComponent>
        </Box>
      </AccordionDetails>
    </PoolComponentStyle >
  )
}