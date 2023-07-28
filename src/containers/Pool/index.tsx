import { ApproveTransactionModal, PoolView, TransactionStatusModal } from 'components';
import { LISK_DECIMALS, TransactionCommands, TransactionModule, TransactionStatus, TransactionType } from 'consts';
import { useJsonRpc } from 'contexts';
import { IPool } from 'models';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppActions, RootState } from 'store';
import { addLiquiditySchema, createPoolSchema } from 'utils';

export const PoolContainer: React.FC = () => {
  const dispatch = useDispatch();

  const { submitedTransaction, submitingTransaction, error: transactionError } = useSelector((state: RootState) => state.transaction);
  const { pools, gotPools, createdPool, updatedPool, gettingPools } = useSelector((state: RootState) => state.pool);
  const { account } = useSelector((state: RootState) => state.wallet);
  const [pool, setPool] = useState<IPool>();

  const [openTransactionStatusModal, setOpenTransactionStatusModal] = useState<boolean>(false);
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>(TransactionStatus.PENDING);
  const [openApproveTransactionModal, setOpenApproveTransactionModal] = useState<boolean>(false);
  const [closeTransactionModal, setCloseTransactionModal] = useState<boolean>(false);

  useEffect(() => {
    dispatch(AppActions.pool.getPools({}));
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
      console.log("chainId, publicKey:", chainId, publicKey);
      const rawTx = {
        module: TransactionModule.dex,
        command: TransactionCommands.createPool,
        fee: BigInt(5000000000000000000),
        nonce: BigInt(1),
        senderPublicKey: Buffer.from(publicKey, "hex"),
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
      // const schema = {
      //   "$id": "/lisk/transferParams",
      //   "title": "Transfer transaction params",
      //   "type": "object",
      //   "required": [
      //     "tokenID",
      //     "amount",
      //     "recipientAddress",
      //     "data"
      //   ],
      //   "properties": {
      //     "tokenID": {
      //       "dataType": "bytes",
      //       "fieldNumber": 1,
      //       "minLength": 8,
      //       "maxLength": 8
      //     },
      //     "amount": {
      //       "dataType": "uint64",
      //       "fieldNumber": 2
      //     },
      //     "recipientAddress": {
      //       "dataType": "bytes",
      //       "fieldNumber": 3,
      //       "format": "lisk32"
      //     },
      //     "data": {
      //       "dataType": "string",
      //       "fieldNumber": 4,
      //       "minLength": 0,
      //       "maxLength": 64
      //     }
      //   }
      // };

      // const rawTx = {
      //   module: 'token',
      //   command: 'transfer',
      //   fee: '100000000',
      //   nonce: '1',
      //   senderPublicKey: 'cf434a889d6c7a064e8de61bb01759a76f585e5ff45a78ba8126ca332601f535',
      //   signatures: [],
      //   params: {
      //     amount: '1000000000000',
      //     data: '',
      //     recipientAddress: 'lskj34x8zh85zh4khjq64ofudmjax2hzc5hxw7vok',
      //     tokenID: '0400001100000000'
      //   },
      //   id: '3d49adde25a12ca34c5893f645ceed395220d1a936e46b9412a2bb77b68e3583',
      // };

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
      console.log("rpcResult: ", rpcResult);
      dispatch(AppActions.transaction.submitTransaction({
        transaction: rpcResult.result,
      }));
    }
  };

  // useEffect(() => {
  //   if (confirmedTransaction && pool) {
  //     if (pool.id) {
  //       dispatch(AppActions.pool.updatePoolSuccess(pool));
  //     } else {
  //       dispatch(AppActions.pool.createPoolSuccess(pool));
  //     }
  //   }
  // }, [confirmedTransaction, pool, dispatch]);

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