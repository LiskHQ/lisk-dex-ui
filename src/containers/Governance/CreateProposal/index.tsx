import { CreateProposalView } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { AppActions, RootState } from 'store';

export const CreateProposalContainer: React.FC = () => {
  const dispatch = useDispatch();

  const { openTransactionApproval, approvedTransaction } = useSelector((state: RootState) => state.transaction);

  const onSubmit = () => {
    dispatch(AppActions.transaction.setExpenses([
      {
        title: 'Proposal creation fee',
        amount: 5000,
      }
    ]));
    dispatch(AppActions.transaction.setOpenTransactionApproval(true));
  };

  const onCloseProposalSubmitted = () => {
    dispatch(AppActions.transaction.resetApproveTransactionState());
  };

  return (
    <CreateProposalView
      openTransactionApproval={openTransactionApproval}
      approvedTransaction={approvedTransaction}
      onSubmit={onSubmit}
      onCloseProposalSubmitted={onCloseProposalSubmitted}
    />
  );
};