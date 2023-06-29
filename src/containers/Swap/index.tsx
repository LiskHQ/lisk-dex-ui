import { SwapView } from 'components';
import { TransactionType } from 'consts';
import { useDispatch, useSelector } from 'react-redux';
import { AppActions, RootState } from 'store';
import { mockTokens } from '__mock__';

export const SwapContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { closeTransactionModal } = useSelector((state: RootState) => state.transaction);
  const { account } = useSelector((state: RootState) => state.wallet);

  const onConfirmSwap = () => {
    dispatch(AppActions.transaction.sendTransaction({
      type: TransactionType.SWAP,
    }));
  };

  return (
    <SwapView
      account={account}
      tokens={mockTokens}
      closeTransactionModal={closeTransactionModal}
      onConfirmSwap={onConfirmSwap}
    />
  );
};