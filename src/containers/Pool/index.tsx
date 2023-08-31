import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApproveTransactionModal, PoolView, TransactionStatusModal } from 'components';
import { LISK_DECIMALS, TransactionCommands, TransactionModule, TransactionStatus, TransactionType } from 'consts';
import { useJsonRpc } from 'contexts';
import { ICreatePool, IPool } from 'models';
import { AppActions, RootState } from 'store';
import { createPoolSchema, createPositionSchema, addLiquiditySchema, removeLiquiditySchema } from 'utils';
import { apiGetAuth } from 'apis';

export const MIN_TICK = -887272; // The minimum possible tick value as a sint32.
export const MAX_TICK = 887272; // The maximum possible tick value as a sint32.

export const PoolContainer: React.FC = () => {
  const dispatch = useDispatch();

  const { submitedTransaction, submitingTransaction, error: transactionError } = useSelector((state: RootState) => state.transaction);
  const { pools, gotPools, gettingPools } = useSelector((state: RootState) => state.pool);
  const { account } = useSelector((state: RootState) => state.wallet);

  const [openTransactionStatusModal, setOpenTransactionStatusModal] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>(TransactionStatus.PENDING);
  const [openApproveTransactionModal, setOpenApproveTransactionModal] = useState<boolean>(false);
  const [closeTransactionModal, setCloseTransactionModal] = useState<boolean>(false);

  useEffect(() => {
    dispatch(AppActions.pool.getPools({}));
    dispatch(AppActions.pool.getStastics({}));
    dispatch(AppActions.token.getAvailableTokens());
  }, [dispatch]);

  // Use `JsonRpcContext` to provide us with relevant RPC methods and states.
  const {
    isRpcRequestPending,
    rpcResult,
    liskRpc,
  } = useJsonRpc();

  const createPool = async (pool: ICreatePool) => {
    if (account) {
      const { chainId, publicKey, address } = account;
      let data;

      try {
        const reponse = await apiGetAuth({
          address: address,
        });
        data = reponse.data;
      } catch (e) {
        console.log(e);
      }

      const { token1, token2, feeTier, tickInitialPrice, token1Amount, token2Amount } = pool;
      const rawTx = {
        module: TransactionModule.dex,
        command: TransactionCommands.createPool,
        fee: BigInt(5000000000000000000),
        nonce: BigInt(data.nonce),
        senderPublicKey: Buffer.from(publicKey, 'hex'),
        signatures: [],
        params: {
          tokenID0: Buffer.from(token1.tokenID, 'hex'),
          tokenID1: Buffer.from(token2.tokenID, 'hex'),
          feeTier: feeTier * 100,
          tickInitialPrice: tickInitialPrice,
          initialPosition: {
            tickLower: MIN_TICK,
            tickUpper: MAX_TICK,
            amount0Desired: BigInt(token1Amount * (10 ** LISK_DECIMALS)),
            amount1Desired: BigInt(token2Amount * (10 ** LISK_DECIMALS)),
          },
          maxTimestampValid: BigInt(100000000000),
        },
      };

      liskRpc.signTransaction(chainId, publicKey, createPoolSchema, rawTx);
      setOpenTransactionStatusModal(true);
      setCloseTransactionModal(false);
    }
  };

  const createPosition = async (pool: ICreatePool) => {
    if (account) {
      const { chainId, publicKey, address } = account;
      let data;

      try {
        const reponse = await apiGetAuth({
          address: address,
        });
        data = reponse.data;
      } catch (e) {
        console.log(e);
      }

      const { token1Amount, token2Amount } = pool;
      const rawTx = {
        module: TransactionModule.dex,
        command: TransactionCommands.createPosition,
        fee: BigInt(5000000000000000000),
        nonce: BigInt(data.nonce),
        senderPublicKey: Buffer.from(publicKey, 'hex'),
        signatures: [],
        params: {
          poolID: Buffer.from('0000000100000000010164000000', 'hex'),
          tickLower: MIN_TICK,
          tickUpper: MAX_TICK,
          amount0Desired: BigInt(token1Amount * (10 ** LISK_DECIMALS)),
          amount1Desired: BigInt(token2Amount * (10 ** LISK_DECIMALS)),
          amount0Min: BigInt(0),
          amount1Min: BigInt(0),
          maxTimestampValid: BigInt(100000000000),
        },
      };

      liskRpc.signTransaction(chainId, publicKey, createPositionSchema, rawTx);
      setOpenTransactionStatusModal(true);
      setCloseTransactionModal(false);
    }
  };

  const addLiquidity = async (pool: IPool) => {
    if (account) {
      const { chainId, publicKey, address } = account;
      let data;

      try {
        const reponse = await apiGetAuth({
          address: address,
        });
        data = reponse.data;
      } catch (e) {
        console.log(e);
      }

      const { token1Amount, token2Amount } = pool;
      const rawTx = {
        module: TransactionModule.dex,
        command: TransactionCommands.addLiquidity,
        fee: BigInt(5000000000000000000),
        nonce: BigInt(data.nonce),
        senderPublicKey: Buffer.from(publicKey, 'hex'),
        signatures: [],
        params: {
          positionID: Buffer.from('0000000100', 'hex'),
          amount0Desired: BigInt(token1Amount * (10 ** LISK_DECIMALS)),
          amount1Desired: BigInt(token2Amount * (10 ** LISK_DECIMALS)),
          amount0Min: BigInt(0),
          amount1Min: BigInt(0),
          maxTimestampValid: BigInt(100000000000),
        },
      };

      liskRpc.signTransaction(chainId, publicKey, addLiquiditySchema, rawTx);
      setOpenTransactionStatusModal(true);
      setCloseTransactionModal(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onConfirmRemoveLiquidity = (pool: IPool) => {
    if (account) {
      const { chainId, publicKey } = account;
      const rawTx = {
        module: TransactionModule.dex,
        command: TransactionCommands.removeLiquidity,
        fee: BigInt(5000000000000000000),
        nonce: BigInt(1),
        senderPublicKey: Buffer.from(publicKey, 'hex'),
        signatures: [],
        params: {
          positionID: Buffer.from('0000000100', 'hex'),
          liquidityToRemove: BigInt(250),
          amount0Min: BigInt(1000),
          amount1Min: BigInt(1000),
          maxTimestampValid: BigInt(100000000000),
        },
      };

      liskRpc.signTransaction(chainId, publicKey, removeLiquiditySchema, rawTx);
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
    if (submitedTransaction) {
      setTransactionStatus(TransactionStatus.SUCCESS);
      setOpenTransactionStatusModal(true);
    }
    if (transactionError.error) {
      setTransactionStatus(TransactionStatus.FAILURE);
      setOpenTransactionStatusModal(true);
    }
    setOpenApproveTransactionModal(false);
  }, [submitedTransaction, transactionError]);

  const onCloseTransactionStatusModal = () => {
    setOpenTransactionStatusModal(false);
    if (submitedTransaction || transactionError.error) {
      setCloseTransactionModal(true);
      setTransactionStatus(TransactionStatus.PENDING);
      dispatch(AppActions.transaction.resetTransactionStates());
    }
  };

  const onCloseApproveTransactionModal = () => {
    setOpenApproveTransactionModal(false);
  };

  //submit signed transaction
  const onConfirmApproval = () => {
    if (rpcResult?.result) {
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
        requestingSignature={isRpcRequestPending && openTransactionStatusModal}
        closeTransactionModal={closeTransactionModal}
        createPool={createPool}
        createPosition={createPosition}
        addLiquidity={addLiquidity}
        onConfirmRemoveLiquidity={onConfirmRemoveLiquidity}
      />
      {
        openTransactionStatusModal &&
        <TransactionStatusModal
          status={transactionStatus}
          type={TransactionType.SUPPLY_LIQUIDITY}
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