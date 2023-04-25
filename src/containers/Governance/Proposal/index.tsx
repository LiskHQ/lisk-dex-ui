import { useRouter } from "next/router";
import { ProposalView } from "components"
import { IProposal } from "models";
import { useEffect, useMemo, useState } from "react";
import { mockProposals } from "__mock__";
import { useDispatch, useSelector } from "react-redux";
import { AppActions, RootState } from "store";

export const ProposalContainer: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { votes, votesTotal, votesTotalPages } = useSelector((state: RootState) => state.proposal);
  const { openTransactionApproval, approvedTransaction } = useSelector((state: RootState) => state.transaction);

  const [votesPage, setVotesPage] = useState<number>(0);

  const proposal: IProposal = useMemo(() => {
    return mockProposals.find(el => el.id === router.query.id) as IProposal
  }, [router.query.id]);

  const onViewMore = () => {
    setVotesPage((prevState) => prevState + 1);
  }

  useEffect(() => {
    dispatch(AppActions.proposal.getVotesByProposal(votesPage));
  }, [votesPage]);

  const onVote = () => {
    dispatch(AppActions.transaction.setExpenses([
      {
        title: 'Transaction fee',
        amount: 0.87,
      }
    ]));
    dispatch(AppActions.transaction.setOpenTransactionApproval(true));
  }

  const onCloseVoteSuccessModal = () => {
    dispatch(AppActions.transaction.resetApproveTransactionState());
  }

  return (
    <ProposalView
      votes={votes}
      votesPage={votesPage}
      votesTotal={votesTotal}
      votesTotalPages={votesTotalPages}
      proposal={proposal}
      openTransactionApproval={openTransactionApproval}
      approvedTransaction={approvedTransaction}
      onViewMore={onViewMore}
      onVote={onVote}
      onCloseVoteSuccessModal={onCloseVoteSuccessModal}
    />
  );
}