import React from "react";
import { ThemeProvider } from "@mui/material";
import { render } from "@testing-library/react";
import { ProposalView, IProposalViewProps } from "./index";
import { lightTheme } from "styles/theme";
import { mockProposals, mockVotes } from "__mock__";
import { ellipsisAddress } from "utils";

function renderComponent(props: IProposalViewProps) {
  return render(
    <ThemeProvider theme={lightTheme}>
      <ProposalView {...props} />
    </ThemeProvider>
  );
}

describe("ProposalView", () => {
  const mockProps: IProposalViewProps = {
    votes: mockVotes.slice(0, 10),
    votesPage: 0,
    votesTotal: mockVotes.length,
    votesTotalPages: 1,
    onViewMore: () => jest.fn(),
    proposal: mockProposals[0],
  }

  it("checks if the component matches the snapshot", () => {
    const { container } = renderComponent(mockProps);
    expect(container).toMatchSnapshot();
  });

  it("check if it renders correct proposal", () => {
    const { getByText } = renderComponent(mockProps);
    expect(getByText(mockProps.proposal.title)).toBeInTheDocument();
    expect(getByText(mockProps.proposal.summary)).toBeInTheDocument();
  });

  it("check if it renders correct votes", () => {
    const { findByText } = renderComponent(mockProps);
    for (const vote of mockProps.votes) {
      expect(findByText(ellipsisAddress(vote.user))).toBeTruthy();
    }
  });
});
