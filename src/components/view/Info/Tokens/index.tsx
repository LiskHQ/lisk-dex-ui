import { faArrowUpRightFromSquare, faChevronRight, faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { Box, Chip, IconButton, ToggleButton, Typography } from '@mui/material';
import { ButtonComponent, InfoChart, PoolsTable, SearchInputComponent, TokensTable, TransactionsTable, } from 'components';
import { PATHS } from 'consts';
import Link from 'next/link';
import { NextRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { createMockChartInfo, mockTokenDetails } from '__mock__';
import { TokensComponentStyle } from './index.style';
import Image from 'next/image';
import { IncreaseIcon } from 'imgs/icons';

export interface ITokenComponentProps {
  router: NextRouter,
}

export const TokensComponent: React.FC<ITokenComponentProps> = (props) => {
  const { router } = props;
  const [isLike, setLike] = useState<boolean>(false);
  const [tokenId, setTokenId] = useState<string>('');

  useEffect(() => {
    if (router) {
      const { query } = router;
      setTokenId(query.tokenId as string);
    }
  }, [router]);

  const token = useMemo(() => {
    return mockTokenDetails[parseInt(tokenId)];
  }, [tokenId]);

  const chartData = useMemo(() => {
    if (tokenId)
      return createMockChartInfo();
    else
      return [];
  }, [tokenId]);

  return (
    <TokensComponentStyle>
      <Box className="info-header">
        {
          !token ?
            <Box>
              <Typography variant="subtitle1">Tokens</Typography>
              <Typography variant="body1">Browse tokens on “dex”.</Typography>
            </Box> :
            <>
              <Box className="info-path">
                <Link href={PATHS.INFO}><Typography variant="h5">Home</Typography></Link>
                <FontAwesomeIcon icon={faChevronRight} />
                <Link href={`${PATHS.INFO}?tabIndex=1`}><Typography variant="h5">Tokens</Typography></Link>
                <FontAwesomeIcon icon={faChevronRight} />
                <Typography variant="h5">{token.shortName}</Typography>
              </Box>
              <Box className="info-view-contract">
                <Typography variant="body1">View Contract</Typography>
                <IconButton>
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </IconButton>
              </Box>
            </>
        }
      </Box>

      {
        token &&
        <Box className="token-header">
          <Box className="token-header-left-box">
            <Box className="token-summary">
              <Box className="token-summary-image-1">
                <Image src={token.image} width={48} height={48} />
              </Box>

              <Box className="token-summary-detail">
                <Box className="token-summary-name">
                  <Typography variant="h5">{token.name}</Typography>
                  <Chip className="token-summary-share" label={token.shortName} />
                </Box>
                <Box>
                  <Typography className="token-price" variant="h5">$0.92 <Typography className="token-price-increasement" variant="caption">3.24% <IncreaseIcon /></Typography></Typography>
                </Box>
              </Box>
            </Box>

            <ToggleButton
              className="like-button"
              value="like"
              selected={isLike}
              onChange={() => {
                setLike(!isLike);
              }}
            >
              <FontAwesomeIcon
                icon={isLike ? fasStar : farStar}
              />
            </ToggleButton>
          </Box>

          <Box className="token-actions">
            <ButtonComponent className="add-liquidity-button" variant="outlined">
              <Typography variant="h5">Add Liquidity</Typography>
            </ButtonComponent>
            <ButtonComponent>
              <Typography variant="h5">Trade</Typography>
            </ButtonComponent>
          </Box>
        </Box>
      }

      {
        !token &&
        <Box className="table-title">
          <Typography variant="subtitle1">Saved Tokens</Typography>
        </Box>
      }
      <InfoChart chartData={chartData} />

      {
        token ?
          <>
            <Box className="table-title">
              <Typography variant="subtitle1">Pools</Typography>
            </Box>
            <PoolsTable />

            <Box className="table-title">
              <Typography variant="subtitle1">Transactions</Typography>
            </Box>
            <TransactionsTable />
          </> :
          <>
            <Box className="table-title">
              <Typography variant="subtitle1">All Tokens</Typography>
            </Box>
            <Box className="token-search-box">
              <SearchInputComponent
                placeholder="Search tokens..."
              />
            </Box>
            <TokensTable />
          </>
      }

    </TokensComponentStyle>
  );
};