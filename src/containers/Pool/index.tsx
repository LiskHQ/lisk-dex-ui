import { PoolView } from "components";
import { IPool } from "models";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppActions, RootState } from "store";

export const PoolContainer: React.FC = () => {
  const dispatch = useDispatch();

  const { sendingTransaction, closeTransactionModal, confirmedTransaction } = useSelector((state: RootState) => state.transaction);
  const { pools, gotPools, createdPool, gettingPools } = useSelector((state: RootState) => state.pool);
  const [pool, setPool] = useState<IPool>();

  const onConfirmSupplyLiquidity = (pool: IPool) => {
    setTimeout(() => {
      dispatch(AppActions.transaction.sendTransaction());
      setPool(pool);
    }, 1000);
  }

  useEffect(() => {
    if (confirmedTransaction && pool) {
      dispatch(AppActions.pool.createPoolSuccess(pool));
    }
  }, [confirmedTransaction, pool]);

  useEffect(() => {
    dispatch(AppActions.pool.getPools());

    setTimeout(() => {
      dispatch(AppActions.pool.getPoolsSuccess());
    }, 1000);
  }, [createdPool]);

  return (
    <PoolView
      pools={pools}
      gettingPools={gettingPools}
      gotPools={gotPools}
      sendingTransaction={sendingTransaction}
      closeTransactionModal={closeTransactionModal}
      onConfirmSupplyLiquidity={onConfirmSupplyLiquidity}
    />
  )
};