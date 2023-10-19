import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { ApproveTransactionModal, SwapView, TransactionStatusModal } from 'components';
import { AlertVariant, LISK_DECIMALS, TransactionCommands, TransactionModule, TransactionStatus, TransactionType, alertMessages } from 'consts';
import { AppActions, RootState } from 'store';
import { useJsonRpc } from 'contexts';
import { createTransactionObject, getTokenAmount, swapExactOutCommandSchema } from 'utils';
import { useEffect, useState } from 'react';
import { IAccount, ISwapData, ITransactionObject } from 'models';

export const SwapContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { account } = useSelector((state: RootState) => state.wallet);
  const { submitedTransaction, submitingTransaction, error: transactionError } = useSelector((state: RootState) => state.transaction);
  const { accountTokens, tokenBalances } = useSelector((state: RootState) => state.token);
  const [openTransactionStatusModal, setOpenTransactionStatusModal] = useState<boolean>(false);
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>(TransactionStatus.PENDING);
  const [openApproveTransactionModal, setOpenApproveTransactionModal] = useState<boolean>(false);
  const [closeTransactionModal, setCloseTransactionModal] = useState<boolean>(false);
  const { pools } = useSelector((root: RootState) => root.pool);

  // states for approvalTransactionModal
  const [transactionObject, setTransactionObject] = useState<ITransactionObject>();
  const [feeTokenID, setFeeTokenID] = useState<string>('');

  // Use `JsonRpcContext` to provide us with relevant RPC methods and states.
  const {
    isRpcRequestPending,
    rpcResult,
    liskRpc,
  } = useJsonRpc();

  useEffect(() => {
    dispatch(AppActions.token.getAccountTokens({}));
    dispatch(AppActions.pool.getPools({}));
    dispatch(AppActions.transaction.resetTransactionStates());
  }, [dispatch]);

  useEffect(() => {
    if (account && account.address) {
      dispatch(AppActions.token.getTokenBalances({
        address: account.address
      }));
    }
  }, [account, dispatch]);

  const onConfirmSwap = (data: ISwapData) => {
    const { tokenIn, tokenOut, amountIn, minAmountOut } = data;

    if (pools.length === 0) {
      enqueueSnackbar(`${tokenIn.symbol}/${tokenOut.symbol} pool is required for swap`, { variant: 'alert', type: AlertVariant.fail, subject: alertMessages.POOL_DOES_NOT_EXIST });
      return;
    }

    if (account) {
      const { chainId, publicKey } = account;

      const params = {
        tokenIdIn: tokenIn.tokenID,
        amountTokenIn: getTokenAmount(amountIn, tokenIn),
        tokenIdOut: tokenOut.tokenID,
        minAmountTokenOut: getTokenAmount(minAmountOut, tokenOut),
        swapRoute: '0000000000000000000001000000000000c8',
        maxTimestampValid: 100000000000,
      };

      createTransactionObject(TransactionModule.dex, TransactionCommands.swapExactOut, account, params)
        .then(({ feeTokenID: _feeTokenID, transactionObject: rawTx, }) => {
          setTransactionObject(rawTx);
          setFeeTokenID(_feeTokenID);

          liskRpc.signTransaction(chainId, publicKey, swapExactOutCommandSchema, rawTx);
          setOpenTransactionStatusModal(true);
          setCloseTransactionModal(false);
        })
        .catch(e => {
          enqueueSnackbar(String(e), { variant: 'alert', type: AlertVariant.fail });
        });
    }
  };

  useEffect(() => {
    if (rpcResult && rpcResult.valid && openTransactionStatusModal) {
      setOpenApproveTransactionModal(true);
    }
  }, [rpcResult]);

  useEffect(() => {
    if (isRpcRequestPending) {
      setTransactionStatus(TransactionStatus.PENDING);
      setOpenTransactionStatusModal(true);
    }
    if (submitedTransaction) {
      setTransactionStatus(TransactionStatus.SUCCESS);
      setOpenTransactionStatusModal(true);
      onCloseApproveTransactionModal();
    }
    if (transactionError.error) {
      setTransactionStatus(TransactionStatus.FAILURE);
      setOpenTransactionStatusModal(true);
      onCloseApproveTransactionModal();
    }
  }, [isRpcRequestPending, transactionError, submitedTransaction]);

  const onCloseTransactionStatusModal = () => {
    setOpenTransactionStatusModal(false);
    if (submitedTransaction || transactionError.error) {
      setCloseTransactionModal(true);
      dispatch(AppActions.transaction.resetTransactionStates());
    }
  };

  const onCloseApproveTransactionModal = () => {
    setOpenApproveTransactionModal(false);
  };

  const getToken2FiatConversion = (tokenSymbol: string, currency: string) => {
    dispatch(AppActions.token.getToken2FiatConversion({
      tokenSymbol,
      currency,
    }));
  };

  //submit signed transaction
  const onConfirmApproval = () => {
    if (rpcResult?.result) {
      const signedTransactions = JSON.parse(rpcResult.result);
      dispatch(AppActions.transaction.submitTransaction({
        transaction: signedTransactions[0],
      }));
    }
  };

  return (
    <>
      <SwapView
        account={account}
        tokens={accountTokens}
        tokenBalances={tokenBalances}
        closeTransactionModal={closeTransactionModal}
        onConfirmSwap={onConfirmSwap}
        getToken2FiatConversion={getToken2FiatConversion}
      />
      {
        openTransactionStatusModal &&
        <TransactionStatusModal
          status={transactionStatus}
          type={TransactionType.SWAP}
          onClose={onCloseTransactionStatusModal}
        />
      }
      {
        openApproveTransactionModal &&
        <ApproveTransactionModal
          approvingTransaction={submitingTransaction}
          transaction={transactionObject}
          account={account as IAccount}
          feeTokenID={feeTokenID}
          accountTokens={accountTokens}
          tokenBalances={tokenBalances}
          onConfirm={onConfirmApproval}
          onClose={onCloseApproveTransactionModal}
        />
      }
    </>
  );
};