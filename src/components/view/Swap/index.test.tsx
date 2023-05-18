import React from "react";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render } from "@testing-library/react";
import { SwapView, ISwapViewProps } from "./index";
import { lightTheme } from "styles/theme";
import { mockBalance, mockTokens } from "__mock__";

function renderComponent(props: ISwapViewProps) {
  return render(
    <ThemeProvider theme={lightTheme}>
      <SwapView {...props} />
    </ThemeProvider>
  );
}

describe("Swap", () => {
  const mockProps: ISwapViewProps = {
    balance: mockBalance,
    tokens: mockTokens,
    closeTransactionModal: false,
    onConfirmSwap: jest.fn(),
    fetchPrices: jest.fn(),
  }

  it("checks if the component matches the snapshot", () => {
    const { container } = renderComponent(mockProps);
    expect(container).toMatchSnapshot();
  });

  it("checks if select token works fine", () => {
    const { getByText, getByTestId } = renderComponent(mockProps);

    const selectTokenButton = getByText("Select a token");
    fireEvent.click(selectTokenButton);
    expect(getByText("Select token")).toBeInTheDocument();

    fireEvent.click(getByTestId("token-item-ETH"));
  });

  it("checks if swap from percent works", () => {
    const { getByDisplayValue, getByTestId } = renderComponent(mockProps);

    fireEvent.click(getByTestId("swap-from-percent-25"));
    expect(getByDisplayValue(mockBalance / 4)).toBeInTheDocument();

    fireEvent.click(getByTestId("swap-from-percent-50"));
    expect(getByDisplayValue(mockBalance / 2)).toBeInTheDocument();

    fireEvent.click(getByTestId("swap-from-percent-max"));
    expect(getByDisplayValue(mockBalance)).toBeInTheDocument();
  });

  it("click swap button to open confirm modal", () => {
    const { getByText, getByTestId } = renderComponent(mockProps);

    const selectTokenButton = getByText("Select a token");
    fireEvent.click(selectTokenButton);
    fireEvent.click(getByTestId("token-item-ETH"));
    fireEvent.click(getByTestId("swap-from-percent-25"));

    fireEvent.click(getByTestId("swap-button"));

    expect(getByText("Review & Confirms")).toBeInTheDocument();

    fireEvent.click(getByTestId("swap-confirm-modal-button-test"));

    expect(mockProps.onConfirmSwap).toBeCalled();
  });

  it("click setting button to open settings modal", () => {
    const { getByText, getByTestId } = renderComponent(mockProps);

    fireEvent.click(getByTestId("swap-setting-button"));
    expect(getByText("Transaction Settings")).toBeInTheDocument();
  })
});
