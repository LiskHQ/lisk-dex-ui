import { ApproveTransactionModal, SwapView, TransactionStatusModal } from 'components';
import { LISK_DECIMALS, TransactionCommands, TransactionModule, TransactionStatus, TransactionType } from 'consts';
import { useDispatch, useSelector } from 'react-redux';
import { AppActions, RootState } from 'store';
import { useJsonRpc } from 'contexts';
import { swapExactInCommandSchema } from 'utils';
import { useEffect, useState } from 'react';
import { ISwapData } from 'models';

export const SwapContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { account } = useSelector((state: RootState) => state.wallet);
  const { submitedTransaction, submitingTransaction, error: transactionError } = useSelector((state: RootState) => state.transaction);
  const { accountTokens, tokenBalances } = useSelector((state: RootState) => state.token);
  const [openTransactionStatusModal, setOpenTransactionStatusModal] = useState<boolean>(false);
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>(TransactionStatus.PENDING);
  const [openApproveTransactionModal, setOpenApproveTransactionModal] = useState<boolean>(false);
  const [closeTransactionModal, setCloseTransactionModal] = useState<boolean>(false);

  // Use `JsonRpcContext` to provide us with relevant RPC methods and states.
  const {
    isRpcRequestPending,
    rpcResult,
    liskRpc,
  } = useJsonRpc();

  useEffect(() => {
    dispatch(AppActions.token.getAccountTokens({}));
  }, [dispatch]);

  useEffect(() => {
    if (account && account.address) {
      dispatch(AppActions.token.getTokenBalances({
        address: account.address
      }));
    }
  }, [account]);

  const onConfirmSwap = (data: ISwapData) => {
    const { tokenIn, tokenOut, amountIn, minAmountOut } = data;

    if (account) {
      const { chainId, publicKey } = account;

      const rawTx = {
        module: TransactionModule.dex,
        command: TransactionCommands.swapExactIn,
        fee: BigInt(5000000),
        nonce: BigInt(0),
        senderPublicKey: publicKey,
        signatures: [],
        params: {
          tokenIdIn: tokenIn.tokenID,
          amountTokenIn: BigInt(amountIn * (10 ** LISK_DECIMALS)),
          tokenIdOut: tokenOut.tokenID,
          minAmountTokenOut: BigInt(minAmountOut * (10 ** LISK_DECIMALS)),
          swapRoute: [Buffer.from('0000000000000000000001000000000000c8', 'hex')],
          maxTimestampValid: BigInt(100000000000),
        },
      };

      liskRpc.signTransaction(chainId, publicKey, swapExactInCommandSchema, rawTx);
      setOpenTransactionStatusModal(true);
      setCloseTransactionModal(false);
    }
  };

  useEffect(() => {
    if (rpcResult && rpcResult.valid) {
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
          expenses={[{
            title: 'Transaction fee',
            amount: '0.87',
          }]}
          approvingTransaction={submitingTransaction}
          onConfirm={onConfirmApproval}
          onClose={onCloseApproveTransactionModal}
        />
      }
    </>
  );
};