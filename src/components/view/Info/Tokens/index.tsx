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
import { IncreaseIcon, tokenSvgs } from 'imgs/icons';
import { IPoolDetail } from 'models';
import { getPoolToken0, getPoolToken1 } from 'utils';

export interface ITokenComponentProps {
  poolDetails: IPoolDetail[],
  onSwap: (token1: string, token2?: string) => void,
  onAddLiquidity: (token1: string, token2?: string) => void,
  onSelectPool: (id: string) => void,
  onSelectToken: (id: string) => void,
  router: NextRouter,
}

export const TokensComponent: React.FC<ITokenComponentProps> = (props) => {
  const {
    poolDetails,
    onSwap,
    onAddLiquidity,
    onSelectPool,
    onSelectToken,
    router
  } = props;

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

  // pools table control
  const [isAsc, setAsc] = useState<boolean>();
  const [sortKey, setSortKey] = useState<string>('');

  const pools = useMemo(() => {
    if (token)
      return poolDetails
        .filter(pool => getPoolToken0(pool.poolName) === token.symbol || getPoolToken1(pool.poolName) === token.symbol)
        .sort((a: any, b: any) => isAsc ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey]);
    return [];
  }, [sortKey, isAsc, token, poolDetails]);

  const onSortClick = (key: string) => {
    if (key !== sortKey) {
      setAsc(false);
      setSortKey(key);
    } else {
      setAsc(!isAsc);
    }
  };
  // transactions table control
  const [transactionsPage, setTransactionsPage] = useState<number>(1);
  const [transactionsLimit, setTransactionsLimit] = useState<number>(10);
  const transactionsTotalPages = useMemo(() => {
    return Math.ceil(10 / transactionsLimit);
  }, [transactionsLimit]);

  // tokens table control
  const [isTokenAsc, setTokenAsc] = useState<boolean>();
  const [sortTokenKey, setSortTokenKey] = useState<string>('');

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalPages, setMaximumPage] = useState<number>(0);
  const [searchFilter, setSearchFilter] = useState<string>('');

  const tokens = useMemo(() => {
    setMaximumPage(Math.ceil(poolDetails.length / limit));
    return mockTokenDetails
      .filter(el => el.symbol.includes(searchFilter) || el.chainName.includes(searchFilter))
      .sort((a: any, b: any) => isTokenAsc ? a[sortTokenKey] - b[sortTokenKey] : b[sortTokenKey] - a[sortTokenKey])
      .slice((page - 1) * limit, page * limit);
  }, [sortTokenKey, isTokenAsc, limit, page, searchFilter]);

  const onSortTokenClick = (key: string) => {
    if (key !== sortTokenKey) {
      setTokenAsc(false);
      setSortTokenKey(key);
    } else {
      setTokenAsc(!isTokenAsc);
    }
  };

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
                <Typography variant="h5">{token.symbol}</Typography>
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
                <Image src={tokenSvgs[token.symbol]} width={48} height={48} />
              </Box>

              <Box className="token-summary-detail">
                <Box className="token-summary-name">
                  <Typography variant="h5">{token.chainName}</Typography>
                  <Chip className="token-summary-share" label={token.symbol} />
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
            <PoolsTable
              pools={pools}
              sortKey={sortKey}
              isAsc={isAsc}
              onSelectPool={onSelectPool}
              onSortClick={onSortClick}
              onSwap={onSwap}
              onAddLiquidity={onAddLiquidity}
            />

            <Box className="table-title">
              <Typography variant="subtitle1">Transactions</Typography>
            </Box>
            <TransactionsTable
              page={transactionsPage}
              limit={transactionsLimit}
              totalPages={transactionsTotalPages}
              onChangeRowCount={value => setTransactionsLimit(value)}
              onNextPage={() => setTransactionsPage(transactionsPage + 1)}
              onPreviousPage={() => setTransactionsPage(transactionsPage - 1)}
            />
          </> :
          <>
            <Box className="table-title">
              <Typography variant="subtitle1">All Tokens</Typography>
            </Box>
            <Box className="token-search-box">
              <SearchInputComponent
                placeholder="Search tokens..."
                value={searchFilter}
                onChange={(value) => setSearchFilter(value)}
              />
            </Box>
            <TokensTable
              pagination
              tokens={tokens}
              isAsc={isTokenAsc}
              sortKey={sortTokenKey}
              onSortClick={onSortTokenClick}
              onSelectToken={onSelectToken}
              onSwap={onSwap}
              onAddLiquidity={onAddLiquidity}
              limit={limit}
              page={page}
              onChangeRowCount={(value) => setLimit(value)}
              onNextPage={() => { setPage(Math.max(page - 1, 1)); }}
              onPreviousPage={() => { setPage(Math.min(page + 1, totalPages)); }}
              totalPages={totalPages}
            />
          </>
      }
    </TokensComponentStyle>
  );
};