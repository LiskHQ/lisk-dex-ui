import Image from 'next/image';
import { Box, Chip, IconButton, ToggleButton, Typography } from '@mui/material';
import { faArrowUpRightFromSquare, faChevronRight, faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { ButtonComponent, InfoChart, PoolsTable, SearchInputComponent } from 'components';
import { NextRouter } from 'next/router';
import { PoolsComponentStyle } from './index.style';
import { useEffect, useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createMockChartInfo, mockPoolDetails } from '__mock__';
import Link from 'next/link';
import { PATHS } from 'consts';

export interface IPoolsComponentProps {
  router: NextRouter,
}

export const PoolsComponent: React.FC<IPoolsComponentProps> = (props) => {
  const { router } = props;
  const [isLike, setLike] = useState<boolean>(false);
  const [poolId, setPoolId] = useState<string>('');

  useEffect(() => {
    if (router) {
      const { query } = router;
      setPoolId(query.poolId as string);
    }
  }, [router]);

  const pool = useMemo(() => {
    return mockPoolDetails[parseInt(poolId)];
  }, [poolId]);

  const chartData = useMemo(() => {
    if (poolId)
      return createMockChartInfo();
    else
      return [];
  }, [poolId]);


  // pools table control
  const [isAsc, setAsc] = useState<boolean>();
  const [sortKey, setSortKey] = useState<string>('');
  const [totalPages, setMaximumPage] = useState<number>(0);

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const pools = useMemo(() => {
    setMaximumPage(Math.ceil(mockPoolDetails.length / limit));
    return mockPoolDetails.sort((a: any, b: any) => isAsc ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey]).slice((page - 1) * limit, page * limit);
  }, [sortKey, isAsc, limit, page]);

  const onSortClick = (key: string) => {
    if (key !== sortKey) {
      setAsc(false);
      setSortKey(key);
    } else {
      setAsc(!isAsc);
    }
  };

  return (
    <PoolsComponentStyle>
      <Box className="info-header">
        {
          !pool ?
            <Box>
              <Typography variant="subtitle1">Liquidity Pools</Typography>
              <Typography variant="body1">Start earning incentives by providing liquidity.</Typography>
            </Box> :
            <>
              <Box className="info-path">
                <Link href={PATHS.INFO}><Typography variant="h5">Home</Typography></Link>
                <FontAwesomeIcon icon={faChevronRight} />
                <Link href={`${PATHS.INFO}?tabIndex=1`}><Typography variant="h5">Pools</Typography></Link>
                <FontAwesomeIcon icon={faChevronRight} />
                <Typography variant="h5">{pool.token1.shortName}/{pool.token2.shortName}</Typography>
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
        pool &&
        <Box className="pool-header">
          <Box className="pool-header-left-box">
            <Box className="pool-summary">
              <Box className="pool-summary-image-1">
                <Image src={pool.token1.image} width={48} height={48} />
              </Box>
              <Box className="pool-summary-image-2">
                <Image src={pool.token2.image} width={48} height={48} />
              </Box>

              <Box className="pool-summary-detail">
                <Box className="pool-summary-name">
                  <Typography variant="h5">{pool.token1.shortName}/{pool.token2.shortName}</Typography>
                  <Chip className="pool-summary-share" label={`${pool.share}%`} />
                </Box>
                <Box>
                  <Typography variant="h5">1 {pool.token1.shortName} = $0.92  1 {pool.token2.shortName} = $2.78</Typography>
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

          <Box className="pool-actions">
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
        !pool &&
        <Box className="table-title">
          <Typography variant="subtitle1">Saved Pools</Typography>
        </Box>
      }
      <InfoChart chartData={chartData} />

      <Box className="table-title pools">
        <Typography variant="subtitle1">All Pools</Typography>
        <ButtonComponent variant='outlined'><Typography variant="h5">Create a pool</Typography></ButtonComponent>
      </Box>
      <Box className="pools-table-action">
        <SearchInputComponent placeholder='Search pools...' />
      </Box>
      <PoolsTable
        pools={pools}
        sortKey={sortKey}
        isAsc={isAsc}
        limit={limit}
        page={page}
        onNextPage={() => { setPage(Math.max(page - 1, 1)) }}
        onPreviousPage={() => { setPage(Math.min(page + 1, totalPages)) }}
        onSortClick={onSortClick}
        onChangeRowCount={value => { setLimit(value) }}
        totalPages={totalPages}
        pagination
      />
    </PoolsComponentStyle>
  );
};