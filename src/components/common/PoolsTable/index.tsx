import { useMemo, useState } from 'react';
import Image from 'next/image';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { ButtonComponent } from 'components';
import { mockPoolDetails } from '__mock__';
import { PoolsTableStyle } from './index.style';
import { HelpIcon, IncreaseIcon } from 'imgs/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';

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

export const PoolsTable: React.FC = () => {
  const [isAsc, setAsc] = useState<boolean>();
  const [sortKey, setSortKey] = useState<string>('');

  const rows = useMemo(() => {
    return mockPoolDetails.sort((a: any, b: any) => isAsc ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey]);
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
    <PoolsTableStyle>
      <TableContainer className="transactions-table">
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
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell scope="row">
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
                <TableCell align="right">
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
    </PoolsTableStyle >
  );
};