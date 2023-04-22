import React from "react";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render } from "@testing-library/react";
import { DepositAmount, IDepositAmountProps } from "./index";
import { lightTheme } from "styles/theme";
import { mockTokens } from "__mock__";

function renderComponent(props: IDepositAmountProps) {
  return render(
    <ThemeProvider theme={lightTheme} >
      <DepositAmount {...props} />
    </ThemeProvider>
  );
}

describe("DepositAmount component", () => {
  const mockProps: IDepositAmountProps = {
    balance: 4521.425,
    tokenAmount: 0,
    token: mockTokens[0],
    onChange: jest.fn(),
  }

  it("checks if the component matches the snapshot", () => {
    const { container } = renderComponent(mockProps);
    expect(container).toMatchSnapshot();
  });

  it("select amount works", () => {
    const { getByText, getByTestId } = renderComponent(mockProps);

    fireEvent.click(getByTestId("LSK-amount-percent-max"));

    expect(getByText(mockProps.balance.toPrecision(4))).toBeInTheDocument();
    expect(mockProps.onChange).toBeCalled();
  });
});
