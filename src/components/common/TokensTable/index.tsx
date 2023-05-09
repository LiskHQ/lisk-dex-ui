import Image from 'next/image';
import { Box, IconButton, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import cn from 'classnames';
import { ButtonComponent, DropdownComponent, PaginationComponent } from 'components';
import { TokensTableStyle } from './index.style';
import { DecreaseIcon, IncreaseIcon } from 'imgs/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { ITokenDetail } from 'models';

const sortKeys = [
  {
    label: 'Price',
    key: 'price',
  },
  {
    label: 'Price Change',
    key: 'priceChange',
  },
  {
    label: 'Volume 24H',
    key: 'volume',
  },
  {
    label: 'Liquidity',
    key: 'liquidity',
  },
];

export interface ITokensTable {
  tokens: ITokenDetail[],
  onChangeRowCount?: (count: number) => void,
  onNextPage?: () => void,
  onPreviousPage?: () => void,
  onSelectToken?: (id: string) => void,
  onSortClick: (key: string) => void,
  sortKey: string,
  isAsc?: boolean,
  limit?: number,
  page?: number,
  pagination?: boolean,
  totalPages?: number
}

export const TokensTable: React.FC<ITokensTable> = (props) => {
  const {
    onChangeRowCount,
    onSelectToken,
    onNextPage,
    onPreviousPage,
    onSortClick,
    pagination,
    tokens,
    sortKey,
    isAsc,
    limit,
    totalPages,
    page
  } = props;

  return (
    <TokensTableStyle>
      <TableContainer className="tokens-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="always-visible"><Typography variant="body2">Name</Typography></TableCell>
              {
                sortKeys.map(el => (
                  <TableCell
                    key={el.key}
                    align="right"
                    className={
                      cn({
                        'always-visible': el.key === 'volume',
                      })
                    }
                  >
                    <Box className="sort-key-table-cell" onClick={() => onSortClick(el.key)}>
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
              <TableCell align="right"><Typography variant="body2">Actions</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tokens && tokens.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={() => { onSelectToken && onSelectToken(index.toString()); }}
              >
                <TableCell className="always-visible" scope="row">
                  <Box className="name-td">
                    <Typography>{index + 1}</Typography>
                    <Box className="token1-image">
                      <Image className="token1-image" src={row.image} width={32} height={32}></Image>
                    </Box>
                    <Typography variant="body2">{row.name}</Typography>
                    <Box className="token-shortname">
                      <Typography variant="caption">{row.shortName}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2">${row.price}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Box className={
                    cn({
                      'price-change-td': true,
                      'decrease': row.priceChange < 0,
                    })
                  }>
                    <Typography variant="body2">{row.priceChange}%</Typography>
                    {
                      row.priceChange >= 0 ? <IncreaseIcon /> :
                        <DecreaseIcon />
                    }
                  </Box>
                </TableCell>
                <TableCell className="always-visible" align="right">
                  <Typography variant="body2">${row.volume}M</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2">${row.liquidity}M</Typography>
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
        <PaginationComponent
          onChangeRowCount={onChangeRowCount}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
          limit={limit}
          page={page}
          totalPages={totalPages}
        />
      }
    </TokensTableStyle >
  );
};