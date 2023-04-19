import { SwapView } from "components"
import { useDispatch, useSelector } from "react-redux";
import { AppActions, RootState } from "store";
import { mockBalance, mockTokens } from "__mock__";

export const SwapContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { openTransactionApproval, approvedTransaction } = useSelector((state: RootState) => state.transaction);

  const onConfirmSwap = () => {
    dispatch(AppActions.transaction.setOpenTransactionApproval(true));
  }

  const onCloseTransactionStatus = () => {
    dispatch(AppActions.transaction.resetApproveTransactionState());
  }

  const fetchPrices = () => {

  }
  return (
    <SwapView
      balance={mockBalance}
      tokens={mockTokens}
      openTransactionApproval={openTransactionApproval}
      approvedTransaction={approvedTransaction}
      onConfirmSwap={onConfirmSwap}
      onCloseTransactionStatus={onCloseTransactionStatus}
      fetchPrices={fetchPrices}
    />
  )
};