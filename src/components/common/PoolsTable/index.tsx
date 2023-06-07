import Image from 'next/image';
import { Box, IconButton, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import cn from 'classnames';
import { ButtonComponent, DropdownComponent } from 'components';
import { PoolsTableStyle } from './index.style';
import { HelpIcon, IncreaseIcon } from 'imgs/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { IPoolDetail } from 'models';

const sortKeys = [
  {
    label: 'TVL',
    key: 'tvl',
  },
  {
    label: 'Volume 24H',
    key: 'volume',
  },
  {
    label: 'Fees 24H',
    key: 'fees',
  },
];

export interface IPoolsTable {
  pools: IPoolDetail[],
  onChangeRowCount?: (count: number) => void,
  onNextPage?: () => void,
  onPreviousPage?: () => void,
  onSelectPool?: (id: string) => void,
  onSortClick: (key: string) => void,
  sortKey: string,
  isAsc?: boolean,
  limit?: number,
  page?: number,
  pagination?: boolean,
  totalPages?: number,
}

export const PoolsTable: React.FC<IPoolsTable> = (props) => {
  const {
    onChangeRowCount,
    onSelectPool,
    onNextPage,
    onPreviousPage,
    onSortClick,
    pagination,
    pools,
    sortKey,
    isAsc,
    limit,
    totalPages,
    page
  } = props;

  return (
    <PoolsTableStyle>
      <TableContainer className="pools-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="always-visible"><Typography variant="body2">Name</Typography></TableCell>
              {
                sortKeys.map(el => (
                  <TableCell
                    className={
                      cn({
                        'always-visible': el.key === 'volume',
                      })
                    }
                    key={el.key}
                    align="right"
                  >
                    <Box
                      className="sort-key-table-cell"
                      onClick={() => onSortClick(el.key)}
                    >
                      <Typography variant="body2">{el.label}</Typography>
                      {
                        sortKey === el.key ?
                          isAsc ?
                            <FontAwesomeIcon icon={faSortUp} /> :
                            <FontAwesomeIcon icon={faSortDown} /> :
                          <FontAwesomeIcon icon={faSort} />
                      }
                    </Box>
                  </TableCell>
                ))
              }
              <TableCell align="right">
                <Box className="apy-th">
                  <Typography variant="body2">APY</Typography>
                  <HelpIcon />
                </Box>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2">Actions</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pools && pools.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={() => { onSelectPool && onSelectPool(index.toString()); }}
              >
                <TableCell className="always-visible" scope="row">
                  <Box className="name-td">
                    <Typography>{index + 1}</Typography>
                    <Box className="token1-image">
                      <Image src={row.token1.image} width={32} height={32}></Image>
                    </Box>
                    <Box className="token2-image">
                      <Image src={row.token2.image} width={32} height={32}></Image>
                    </Box>
                    <Typography>{row.token1.shortName} - {row.token1.shortName}</Typography>

                    <Box className="token-share">
                      <Typography variant="caption">{row.share}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2">${row.tvl}M</Typography>
                </TableCell>
                <TableCell className="always-visible" align="right">
                  <Typography variant="body2">${row.volume}M</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2">${row.fees}K</Typography>
                </TableCell>
                <TableCell align="right">
                  <Box className="apy-td">
                    <Typography variant="body2">{row.APY}%</Typography>
                    <IncreaseIcon />
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box className="actions-td">
                    <ButtonComponent variant="outlined" size="small">
                      <Typography variant="body2">Add Liquidty</Typography>
                    </ButtonComponent>
                    <ButtonComponent size="small">
                      <Typography variant="body2">Swap</Typography>
                    </ButtonComponent>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {
        pagination &&
        <Box className="pools-pager">
          <DropdownComponent
            className='row-count-dropdown'
            onChange={(e) => { onChangeRowCount && onChangeRowCount(e.target.value as number); }}
            defaultValue={limit}
            renderValue={(value) => (
              <Box className='show-rows-dropdown'>
                <Typography variant='h6'>Show rows:</Typography>
                <Typography variant='body2'>{value}</Typography>
              </Box>
            )}
          >
            <MenuItem value="5">5</MenuItem>
            <MenuItem value="10">10</MenuItem>
            <MenuItem value="25">25</MenuItem>
          </DropdownComponent>
          <IconButton
            onClick={() => { onNextPage && onNextPage(); }}
            disabled={page == 1}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </IconButton>
          <Typography variant='body2'>Page {page} of {totalPages && totalPages}</Typography>
          <IconButton
            onClick={() => { onPreviousPage && onPreviousPage(); }}
            disabled={totalPages == page}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </IconButton>
        </Box>
      }
    </PoolsTableStyle >
  );
};