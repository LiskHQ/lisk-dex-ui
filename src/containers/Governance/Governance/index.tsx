import { GovernanceView } from "components"
import { mockProposals } from "__mock__";

export const GovernanceContainer: React.FC = () => {
  return (
    <GovernanceView proposals={mockProposals} />
  );
}