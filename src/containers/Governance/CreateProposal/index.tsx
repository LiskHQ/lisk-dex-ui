import { CreateProposalView } from 'components';

export const CreateProposalContainer: React.FC = () => {
  const onSubmit = () => {
  };

  const onCloseProposalSubmitted = () => {
  };

  return (
    <CreateProposalView
      onSubmit={onSubmit}
      onCloseProposalSubmitted={onCloseProposalSubmitted}
    />
  );
};