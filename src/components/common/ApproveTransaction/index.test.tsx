import { ThemeProvider } from "@mui/material";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { lightTheme } from "styles/theme";
import { ApproveTransactionModal, IApproveTransactionModalProps } from ".";

function renderComponent(props: IApproveTransactionModalProps) {
  return render(
    <ThemeProvider theme={lightTheme}>
      <ApproveTransactionModal {...props} />
    </ThemeProvider>
  );
}

describe("Button component", () => {
  const mockProps: IApproveTransactionModalProps = {
    approvingTransaction: false,
    onClose: jest.fn(),
    onConfirm: jest.fn(),
  }

  it("checks if the component matches the snapshot", () => {
    const { container } = renderComponent(mockProps);
    expect(container).toMatchSnapshot();
  });

  it("checks all buttons click work fine", () => {
    const { getByText } = renderComponent(mockProps);

    fireEvent.click(getByText("Cancel"));
    expect(mockProps.onClose).toBeCalled();

    fireEvent.click(getByText("Send wallet request"));
    expect(mockProps.onConfirm).toBeCalled();
  });

});