import React from "react";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render } from "@testing-library/react";
import { VoteModal, IVoteModalProps } from "./index";
import { lightTheme } from "styles/theme";
import { VoteType } from "consts";

function renderComponent(props: IVoteModalProps) {
  return render(
    <ThemeProvider theme={lightTheme}>
      <VoteModal {...props} />
    </ThemeProvider>
  );
}

describe("VoteModal", () => {
  const mockProps: IVoteModalProps = {
    openTransactionApproval: false,
    type: VoteType.Yes,
    onClose: jest.fn(),
    onVote: jest.fn(),
  }

  it("checks if the component matches the snapshot", () => {
    const { container } = renderComponent(mockProps);
    expect(container).toMatchSnapshot();
  });

  it("check close button work", () => {
    const { getByTestId } = renderComponent(mockProps);
    fireEvent.click(getByTestId("vote-modal-close-button-test"));

    expect(mockProps.onClose).toBeCalled();
  });

  it("revote work", () => {
    const { getByText } = renderComponent(mockProps);

    expect(getByText("Recast your vote")).toBeInTheDocument();
  });
});
