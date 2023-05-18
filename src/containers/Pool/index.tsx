import { PoolView } from "components";
import { TransactionType } from "consts";
import { IPool } from "models";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppActions, RootState } from "store";

export const PoolContainer: React.FC = () => {
  const dispatch = useDispatch();

  const { sendingTransaction, closeTransactionModal, confirmedTransaction } = useSelector((state: RootState) => state.transaction);
  const { pools, gotPools, createdPool, updatedPool, gettingPools } = useSelector((state: RootState) => state.pool);
  const [pool, setPool] = useState<IPool>();

  const onConfirmSupplyLiquidity = (pool: IPool) => {
    setTimeout(() => {
      if (pool.id) {
        dispatch(AppActions.transaction.sendTransaction({
          type: TransactionType.INCREASE_LIQUIDITY,
        }));
      } else {
        dispatch(AppActions.transaction.sendTransaction({
          type: TransactionType.SUPPLY_LIQUIDITY,
        }));
      }
      setPool(pool);
    }, 1000);
  }

  const onConfirmRemoveLiquidity = (pool: IPool) => {
    setTimeout(() => {
      dispatch(AppActions.transaction.sendTransaction({
        type: TransactionType.REMOVE_LIQUIDITY,
      }));
      setPool(pool);
    }, 1000);
  }

  useEffect(() => {
    if (confirmedTransaction && pool) {
      if (pool.id) {
        dispatch(AppActions.pool.updatePoolSuccess(pool));
      } else {
        dispatch(AppActions.pool.createPoolSuccess(pool));
      }
    }
  }, [confirmedTransaction, pool]);

  useEffect(() => {
    dispatch(AppActions.pool.getPools());

    setTimeout(() => {
      dispatch(AppActions.pool.getPoolsSuccess());
    }, 1000);
  }, [createdPool, updatedPool]);

  return (
    <PoolView
      pools={pools}
      gettingPools={gettingPools}
      gotPools={gotPools}
      sendingTransaction={sendingTransaction}
      closeTransactionModal={closeTransactionModal}
      onConfirmSupplyLiquidity={onConfirmSupplyLiquidity}
      onConfirmRemoveLiquidity={onConfirmRemoveLiquidity}
    />
  )
};