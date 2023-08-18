import { ApproveTransactionModal, PoolView, TransactionStatusModal } from 'components';
import { TransactionCommands, TransactionModule, TransactionStatus, TransactionType } from 'consts';
import { useJsonRpc } from 'contexts';
import { IPool } from 'models';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppActions, RootState } from 'store';
import { createPoolSchema } from 'utils';

export const PoolContainer: React.FC = () => {
  const dispatch = useDispatch();

  const { submitedTransaction, submitingTransaction, error: transactionError } = useSelector((state: RootState) => state.transaction);
  const { pools, gotPools, gettingPools } = useSelector((state: RootState) => state.pool);
  const { account } = useSelector((state: RootState) => state.wallet);
  const [pool, setPool] = useState<IPool>();

  const [openTransactionStatusModal, setOpenTransactionStatusModal] = useState<boolean>(false);
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>(TransactionStatus.PENDING);
  const [openApproveTransactionModal, setOpenApproveTransactionModal] = useState<boolean>(false);
  const [closeTransactionModal, setCloseTransactionModal] = useState<boolean>(false);

  useEffect(() => {
    dispatch(AppActions.pool.getPools({}));
    dispatch(AppActions.pool.getStastics({}));
  }, [dispatch]);

  // Use `JsonRpcContext` to provide us with relevant RPC methods and states.
  const {
    isRpcRequestPending,
    rpcResult,
    liskRpc,
  } = useJsonRpc();

  const onConfirmSupplyLiquidity = (pool: IPool) => {
    if (account) {
      const { chainId, publicKey } = account;
      const { token1Amount, token2Amount } = pool;
      console.log(' token1Amount, token2Amount: ', token1Amount, token2Amount);
      console.log("chainId, publicKey:", chainId, publicKey);
      const rawTx = {
        module: TransactionModule.dex,
        command: TransactionCommands.createPool,
        fee: BigInt(5000000000000000000),
        nonce: BigInt(1),
        senderPublicKey: Buffer.from(publicKey, 'hex'),
        signatures: [],
        params: {
          tokenID0: Buffer.from('0100000000', 'hex'),
          tokenID1: Buffer.from('1000000000', 'hex'),
          feeTier: 100,
          tickInitialPrice: 1,
          initialPosition: {
            tickLower: -887272,
            tickUpper: 887272,
            amount0Desired: BigInt(1000),
            amount1Desired: BigInt(1000),
          },
          maxTimestampValid: BigInt(100000000000),
        },
      };

      liskRpc.signTransaction(chainId, publicKey, createPoolSchema, rawTx);
      setOpenTransactionStatusModal(true);
      setCloseTransactionModal(false);
    }
  };

  const onConfirmRemoveLiquidity = (pool: IPool) => {
    setTimeout(() => {
      dispatch(AppActions.transaction.sendTransaction({
        type: TransactionType.REMOVE_LIQUIDITY,
      }));
      setPool(pool);
    }, 1000);
  };

  useEffect(() => {
    if (rpcResult && rpcResult.valid) {
      setOpenApproveTransactionModal(true);
    }
  }, [rpcResult]);

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


  //submit signed transaction
  const onConfirmApproval = () => {
    if (rpcResult?.result) {
      console.log('rpcResult: ', rpcResult);
      dispatch(AppActions.transaction.submitTransaction({
        transaction: rpcResult.result,
      }));
    }
  };

  return (
    <>
      <PoolView
        pools={pools}
        gettingPools={gettingPools}
        gotPools={gotPools}
        account={account}
        sendingTransaction={isRpcRequestPending}
        closeTransactionModal={closeTransactionModal}
        onConfirmSupplyLiquidity={onConfirmSupplyLiquidity}
        onConfirmRemoveLiquidity={onConfirmRemoveLiquidity}
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