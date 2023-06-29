import { Grid } from '@mui/material';
import { IAccount, IPool } from 'models';
import { useEffect, useState } from 'react';
import { PoolViewStyle } from './index.style';
import { LiskDexLP } from './LiskDexLP';
import { RemoveLiquidityModal } from './RemoveLiquidityModal';
import { SupplyLiquidity } from './SupplyLiquidity';
import { SupplyLiquidityModal } from './SupplyLiquidityModal';

export interface IPoolViewProps {
  sendingTransaction: boolean,
  pools: IPool[],
  gettingPools: boolean,
  gotPools: boolean,
  closeTransactionModal: boolean,
  account: IAccount | null,
  onConfirmSupplyLiquidity: (pool: IPool) => void,
  onConfirmRemoveLiquidity: (pool: IPool) => void,
}

export const PoolView: React.FC<IPoolViewProps> = (props) => {
  const {
    sendingTransaction,
    pools,
    gotPools,
    gettingPools,
    account,
    closeTransactionModal,
    onConfirmSupplyLiquidity,
    onConfirmRemoveLiquidity
  } = props;

  const [openSupplyModal, setOpenSupplyModal] = useState<boolean>(false);
  const [openRemoveLiquidityModal, setOpenRemoveLiquidityModal] = useState<boolean>(false);
  const [pool, setPool] = useState<IPool>();

  const onPreview = (pool: IPool) => {
    setOpenSupplyModal(true);
    setPool(pool);
  };

  const onPreviewRemove = (pool: IPool) => {
    setOpenRemoveLiquidityModal(true);
    setPool(pool);
  };

  useEffect(() => {
    if (sendingTransaction) {
      setOpenSupplyModal(false);
      setOpenRemoveLiquidityModal(false);
    }
  }, [sendingTransaction]);

  return (
    <PoolViewStyle>
      <Grid container spacing={3}>
        <Grid item lg={5.5} md={12} sm={12} xs={12}>
          <SupplyLiquidity
            onPreview={onPreview}
            account={account}
            closeTransactionModal={closeTransactionModal}
          />
        </Grid>
        <Grid item lg={6.5} md={12} sm={12} xs={12}>
          <LiskDexLP
            pools={pools}
            gotPools={gotPools}
            gettingPools={gettingPools}
            onPreview={onPreview}
            onPreviewRemove={onPreviewRemove}
          />
        </Grid>
      </Grid>
      {
        openSupplyModal && pool &&
        <SupplyLiquidityModal
          pool={pool}
          onClose={() => { setOpenSupplyModal(false); }}
          onConfirm={onConfirmSupplyLiquidity}
        />
      }
      {
        openRemoveLiquidityModal && pool &&
        <RemoveLiquidityModal
          pool={pool}
          onClose={() => { setOpenSupplyModal(false); }}
          onConfirm={onConfirmRemoveLiquidity}
        />
      }
    </PoolViewStyle>
  );
};