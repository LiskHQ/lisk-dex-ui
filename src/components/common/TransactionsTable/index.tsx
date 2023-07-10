import { useMemo } from 'react';
import Image from 'next/image';
import { Box, IconButton, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { faArrowLeft, faArrowRight, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DropdownComponent, SearchInputComponent } from 'components';
import { IToken } from 'models';
import { mockTokens } from '__mock__';
import { TransactionsTableStyle } from './index.style';
import { ellipsisAddress } from 'utils';

function createData(
  token1: IToken,
  token2: IToken,
  account: string,
  time: string,
) {
  return { token1, token2, account, time };
}

const rows = [
  createData(mockTokens[0], mockTokens[1], '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1', '2022-10-22 09:24:31'),
  createData(mockTokens[1], mockTokens[0], '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1', '2022-10-22 09:24:31'),
  createData(mockTokens[3], mockTokens[1], '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1', '2022-10-22 09:24:31'),
  createData(mockTokens[2], mockTokens[2], '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1', '2022-10-22 09:24:31'),
  createData(mockTokens[4], mockTokens[4], '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1', '2022-10-22 09:24:31'),
  createData(mockTokens[3], mockTokens[3], '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1', '2022-10-22 09:24:31'),
  createData(mockTokens[2], mockTokens[4], '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1', '2022-10-22 09:24:31'),
  createData(mockTokens[5], mockTokens[5], '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1', '2022-10-22 09:24:31'),
  createData(mockTokens[4], mockTokens[2], '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1', '2022-10-22 09:24:31'),
  createData(mockTokens[1], mockTokens[4], '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1', '2022-10-22 09:24:31'),
];

export interface ITransactionsTable {
  onChangeRowCount?: (count: number) => void,
  onNextPage?: () => void,
  onPreviousPage?: () => void,
  limit?: number,
  page?: number,
  totalPages?: number,
}

export const TransactionsTable: React.FC<ITransactionsTable> = (props) => {
  const {
    onChangeRowCount,
    onNextPage,
    onPreviousPage,
    limit,
    totalPages,
    page
  } = props;

  const transactions = useMemo(() => {
    if (page && limit)
      return rows.slice((page - 1) * limit, page * limit);
    return [];
  }, [page, limit]);

  return (
    <TransactionsTableStyle>
      <Box className="transactions-filter-box">
        <SearchInputComponent
          className="transactions-search-input"
          placeholder="Search transactions by token..."
        />
        <DropdownComponent className="transactions-filter-dropdown" defaultValue={10}>
          <MenuItem value="10">
            <Typography variant="body2">All transactions</Typography>
          </MenuItem>
          <MenuItem value="20">
            <Typography variant="body2">Swaps</Typography>
          </MenuItem>
          <MenuItem value="30">
            <Typography variant="body2">Adds</Typography>
          </MenuItem>
          <MenuItem value="40">
            <Typography variant="body2">Removes</Typography>
          </MenuItem>
        </DropdownComponent>
      </Box>

      <TableContainer className="transactions-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="body2">Name</Typography></TableCell>
              <TableCell align="right"><Typography variant="body2">Action</Typography></TableCell>
              <TableCell align="right"><Typography variant="body2">Details</Typography></TableCell>
              <TableCell align="right"><Typography variant="body2">Account</Typography></TableCell>
              <TableCell align="right"><Typography variant="body2">Time</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.length > 0 && transactions.map((row: any, index: number) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell scope="row">
                  <Box className="name-td">
                    <Typography>{index + 1}</Typography>
                    <Box className="token1-image">
                      <Image className="token1-image" src={row.token1.image} width={32} height={32}></Image>
                    </Box>
                    <Box className="token2-image">
                      <Image src={row.token2.image} width={32} height={32}></Image>
                    </Box>
                    <Typography>{row.token1.symbol} - {row.token1.symbol}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box className="action-td">
                    <Typography variant="body2">Swap {row.token1.symbol} for {row.token2.symbol}</Typography>
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box className="details-td">
                    <Image src={row.token1.image} width={16} height={16} />
                    <Typography variant="body2">142.3k {row.token1.symbol}</Typography>
                    <FontAwesomeIcon className="arrow-icon" icon={faArrowRight} />
                    <Image src={row.token2.image} width={16} height={16} />
                    <Typography variant="body2">0.4k {row.token1.symbol}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box className="action-td">
                    <Typography variant="body2">{ellipsisAddress(row.account)}</Typography>
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                  </Box>
                </TableCell>
                <TableCell align="right">{row.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box className="transactions-pager">
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
          onClick={() => { onPreviousPage && onPreviousPage(); }}
          disabled={page == 1}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </IconButton>
        <Typography variant='body2'>Page {page} of {totalPages && totalPages}</Typography>
        <IconButton
          onClick={() => { onNextPage && onNextPage(); }}
          disabled={totalPages == page}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </IconButton>
      </Box>
    </TransactionsTableStyle >
  );
};