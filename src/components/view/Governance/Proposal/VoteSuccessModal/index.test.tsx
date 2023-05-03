import React from "react";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render } from "@testing-library/react";
import { VoteSuccessModal, IVoteSuccessModalProps } from "./index";
import { lightTheme } from "styles/theme";

function renderComponent(props: IVoteSuccessModalProps) {
  return render(
    <ThemeProvider theme={lightTheme}>
      <VoteSuccessModal {...props} />
    </ThemeProvider>
  );
}

describe("VoteSuccessModal", () => {
  const mockProps: IVoteSuccessModalProps = {
    openTransactionApproval: false,
    revote: false,
    onClose: jest.fn(),
  }

  it("checks if the component matches the snapshot", () => {
    const { container } = renderComponent(mockProps);
    expect(container).toMatchSnapshot();
  });

  it("check close button work", () => {
    const { getByTestId } = renderComponent(mockProps);
    fireEvent.click(getByTestId("vote-success-modal-close-test"));

    expect(mockProps.onClose).toBeCalled();
  });

  it("revote work", () => {
    const { getByText } = renderComponent({
      ...mockProps,
      revote: true,
    });

    expect(getByText("You have successfully revoted")).toBeInTheDocument();
  });
});
