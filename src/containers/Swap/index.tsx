import { SwapView } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { AppActions, RootState } from 'store';
import { mockBalance, mockTokens } from '__mock__';

export const SwapContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { closeTransactionModal } = useSelector((state: RootState) => state.transaction);

  const onConfirmSwap = () => {
    dispatch(AppActions.transaction.sendTransaction());
  };

  const fetchPrices = () => {

  };
  return (
    <SwapView
      balance={mockBalance}
      tokens={mockTokens}
      closeTransactionModal={closeTransactionModal}
      onConfirmSwap={onConfirmSwap}
      fetchPrices={fetchPrices}
    />
  );
};