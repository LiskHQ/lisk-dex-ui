import { useRouter } from 'next/router';
import { ProposalView } from 'components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppActions, RootState } from 'store';

export const ProposalContainer: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { votes, votesTotal, votesTotalPages, proposal } = useSelector((state: RootState) => state.proposal);
  const [votesPage, setVotesPage] = useState<number>(0);

  const onViewMore = () => {
    setVotesPage((prevState) => prevState + 1);
  };

  useEffect(() => {
    dispatch(AppActions.proposal.getVotesByProposal(votesPage));
    if (router.query.id) {
      dispatch(AppActions.proposal.getCertainProposal({ proposalId: router.query.id }));
    }
  }, [votesPage, dispatch, router.query.id]);

  const onVote = () => {
  };

  const onCloseVoteSuccessModal = () => {
  };

  return (
    <ProposalView
      votes={votes}
      votesPage={votesPage}
      votesTotal={votesTotal}
      votesTotalPages={votesTotalPages}
      proposal={proposal}
      onViewMore={onViewMore}
      onVote={onVote}
      onCloseVoteSuccessModal={onCloseVoteSuccessModal}
    />
  );
};