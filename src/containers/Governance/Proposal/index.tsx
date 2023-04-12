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

  return (
    <ProposalView
      votes={votes}
      votesPage={votesPage}
      votesTotal={votesTotal}
      votesTotalPages={votesTotalPages}
      onViewMore={onViewMore}
      proposal={proposal}
    />
  );
}