import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { HistoryComponentStyle } from './index.style';
import { SwapIcon } from 'imgs/icons';
import { LoaderComponent } from 'components';
import { AppActions, RootState } from 'store';
import { timestampToString } from 'utils';
import { TransactionCommands } from 'consts';
import { ITransaction } from 'models';

interface IHistoryComponentProps {
  accountAddress: string,
}

export const HistoryComponent: React.FC<IHistoryComponentProps> = (props) => {
  const dispatch = useDispatch();
  const { accountAddress } = props;
  const { availableTokens } = useSelector((root: RootState) => root.token);
  const { transactions, offset, total } = useSelector((root: RootState) => root.transaction);

  useEffect(() => {
    dispatch(AppActions.transaction.getTransactions({
      limit: 10,
      offset,
      senderAddress: accountAddress
    }));
  }, []);

  const _transactions: ITransaction[] = useMemo(() => {
    if (_transactions)
      return [..._transactions, ...transactions];
    return [...transactions];
  }, [transactions]);

  const loadMoreTransactions = () => {
    dispatch(AppActions.transaction.getTransactions({
      limit: 10,
      offset: +offset + 1,
      senderAddress: accountAddress
    }));
  };

  const getTokenName = (tokenId: string) => {
    return availableTokens.find(token => token.tokenID === tokenId)?.tokenName;
  };

  return (
    <HistoryComponentStyle>
      <Typography variant="h4">History</Typography>
      <Box className="transaction-list">
        <InfiniteScroll
          dataLength={_transactions.length}
          next={loadMoreTransactions}
          hasMore={_transactions.length < total}
          loader={<LoaderComponent />}
        >
          {
            _transactions.map((transaction, index) => (
              <Box
                className="transaction-item"
                key={index}
              >
                <Typography variant="body2">{timestampToString(transaction.block.timestamp)}</Typography>
                <Box className="transaction-item-main">
                  <Box className="transaction-type-icon">
                    <SwapIcon />
                  </Box>
                  <Box className="transaction-summary">
                    {
                      {
                        [TransactionCommands.swapExactIn]:
                          <Box className="transaction-values">
                            <Typography variant="body2">Swap {getTokenName(transaction.params.tokenIdIn)} for {getTokenName(transaction.params.tokenIdOut)}</Typography>
                            <Typography variant="body2">{transaction.params.amountTokenIn} {getTokenName(transaction.params.tokenIdIn)}</Typography>
                          </Box>,
                        [TransactionCommands.createPool]:
                          <Box className="transaction-values">
                            <Typography variant="body2">Create {getTokenName(transaction.params.tokenID0)} & {getTokenName(transaction.params.tokenID1)}</Typography>
                            <Typography variant="body2">{transaction.params.initialPosition.amount0Desired} {getTokenName(transaction.params.tokenID0)} & {transaction.params.initialPosition.amount1Desired} {getTokenName(transaction.params.tokenID1)}</Typography>
                          </Box>,
                        [TransactionCommands.addLiquidity]:
                          <Box className="transaction-values">
                            <Typography variant="body2">Add LSK & DEX</Typography>
                            <Typography variant="body2">{transaction.params.amount0Desired} LSK & {transaction.params.amount1Desired} DEX</Typography>
                          </Box>
                      }[transaction.moduleCommand]
                    }
                    <Box className="transaction-status">
                      <Typography variant="body2">{transaction.executionStatus}</Typography>
                      <Typography variant="body2">${transaction.fee}</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))
          }
        </InfiniteScroll>
      </Box>
    </HistoryComponentStyle >
  );
};