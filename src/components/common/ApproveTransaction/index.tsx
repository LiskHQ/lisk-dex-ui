import Image from 'next/image';
import { Box, FormLabel, Typography } from '@mui/material';
import { ButtonComponent } from 'components/common';
import { CancelIcon, LightcurveIcon } from 'imgs/icons';
import { ellipsisAddress, getDispalyTokenAmount } from 'utils';
import { ApproveTransactionModalStyle } from './index.style';
import { IAccount, IExpense, IToken, ITokenBalance, ITransactionObject } from 'models';
import { useMemo } from 'react';
import { mockConversionRate } from '__mock__';
import WalletVisual from '../Wallet/WalletVisual';

export interface IApproveTransactionModalProps {
  approvingTransaction: boolean,
  expenses?: IExpense[],
  transaction?: ITransactionObject,
  account?: IAccount,
  accountTokens?: IToken[],
  tokenBalances?: ITokenBalance[],
  feeTokenID?: string,
  onClose?: () => void,
  onConfirm?: () => void,
}

export const ApproveTransactionModal: React.FC<IApproveTransactionModalProps> = (props) => {
  const {
    approvingTransaction,
    expenses,
    transaction,
    account,
    accountTokens,
    tokenBalances,
    feeTokenID,
    onConfirm,
    onClose
  } = props;

  const isSendWalletRequest = useMemo(() => {
    return expenses ? !!expenses.find(el => el.title === 'Proposal creation fee') : false;
  }, [expenses]);

  const getTokenDetail = (tokenID: string) => {
    return accountTokens && accountTokens.find(el => el.tokenID === tokenID);
  };

  return (
    <ApproveTransactionModalStyle>
      <Box className="approve-transaction-background"></Box>
      <Box className="approve-transaction-modal-container">
        <Box className="approve-transaction-modal-header">
          <Typography variant="h4">Approve transaction</Typography>

          <Box className="approve-transaction-status">
            <Box className="transaction-status">
              <Box className="status"></Box>
              <Typography variant="h5">Lisk Testnet</Typography>
            </Box>
            <CancelIcon onClick={() => { onClose && onClose(); }}></CancelIcon>
          </Box>
        </Box>

        <Box className="approve-transaction-modal-body">
          <Typography variant="body1">This action will approve this transaction.</Typography>

          <Box className="approve-transaction-wallet-info">
            <Box className="approve-transaction-account">
              <FormLabel>Account:</FormLabel>
              <Box className="approve-transaction-account-address">
                <WalletVisual address={account?.address} size={24} />&nbsp;
                <Typography variant="body1">{ellipsisAddress(account ? account.address || '' : '')}</Typography>
              </Box>
            </Box>
            <Box className="approve-transaction-balance">
              <FormLabel>Balances:</FormLabel>
              {
                tokenBalances && tokenBalances.map((tokenBalance: ITokenBalance) =>
                  <Box className="approve-transaction-balance-amount">
                    <img src={getTokenDetail(tokenBalance.tokenID)?.logo.png} width={20} height={20} style={{ borderRadius: '100%' }} />&nbsp;
                    <Typography variant="body1">{getDispalyTokenAmount(+tokenBalance.availableBalance, getTokenDetail(tokenBalance.tokenID) || accountTokens[0])} {getTokenDetail(tokenBalance.tokenID)?.symbol}</Typography>
                  </Box>
                )
              }
            </Box>
          </Box>

          {
            isSendWalletRequest &&
            <Box className="approve-transaction-estimated-balance-change">
              <Typography variant="h5">Estimated balance change</Typography>
              <Box className="approve-transaction-estimated-balance">
                <Typography variant="h5">LSK:</Typography>
                <Typography className="estimated-balance" variant="h5">-5000 LSK</Typography>
              </Box>
            </Box>
          }

          <Box className="approve-transaction-request">
            <LightcurveIcon />
            <Typography variant="h4">Approve request</Typography>
            <Typography variant="body1">https://liskdex.io</Typography>
          </Box>

          <Typography variant="subtitle1">Transaction Summary</Typography>

          {
            !!expenses && expenses.map(expense => (
              <Box key={expense.title} className="approve-transaction-proposal-creation-fee">
                <Typography variant="body1">{expense.title}:</Typography>
                <Typography variant="body1">{expense.amount}</Typography>
              </Box>
            ))
          }

          {
            feeTokenID && transaction && accountTokens &&
            <Box className="approve-transaction-proposal-transaction-total">
              <Typography variant="subtitle2">Network Fee: </Typography>
              <Typography variant="subtitle2">
                {getDispalyTokenAmount(+transaction?.fee, accountTokens?.find(el => el.tokenID === feeTokenID) || accountTokens[0])} {accountTokens?.find(el => el.tokenID === feeTokenID)?.symbol}
              </Typography>
            </Box>
          }
        </Box>

        <Box className="approve-transaction-modal-footer">
          <ButtonComponent
            className="approve-transaction-modal-cancel"
            variant="text"
            onClick={() => { onClose && onClose(); }}
          >
            <Typography variant="body1">Cancel</Typography>
          </ButtonComponent>
          <ButtonComponent
            className="approve-transaction-modal-confirm"
            loading={approvingTransaction}
            onClick={() => { onConfirm && onConfirm(); }}
          >
            <Typography variant="body1">
              Approve
            </Typography>
          </ButtonComponent>
        </Box>
      </Box>
    </ApproveTransactionModalStyle>
  );
};
