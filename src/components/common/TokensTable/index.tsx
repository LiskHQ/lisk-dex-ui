import { useMemo, useState } from 'react';
import Image from 'next/image';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import cn from 'classnames';
import { ButtonComponent } from 'components';
import { mockTokenDetails } from '__mock__';
import { TokensTableStyle } from './index.style';
import { DecreaseIcon, IncreaseIcon } from 'imgs/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';

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

export const TokensTable: React.FC = () => {
  const [isAsc, setAsc] = useState<boolean>();
  const [sortKey, setSortKey] = useState<string>('');

  const rows = useMemo(() => {
    return mockTokenDetails.sort((a: any, b: any) => isAsc ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey]);
  }, [sortKey, isAsc]);

  const onSortClick = (key: string) => {
    if (key !== sortKey) {
      setAsc(false);
      setSortKey(key);
    } else {
      setAsc(!isAsc);
    }
  };

  return (
    <TokensTableStyle>
      <TableContainer className="tokens-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="body2">Name</Typography></TableCell>
              {
                sortKeys.map(el => (
                  <TableCell
                    key={el.key}
                    align="right"
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
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell scope="row">
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
                <TableCell align="right">
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
    </TokensTableStyle >
  );
};