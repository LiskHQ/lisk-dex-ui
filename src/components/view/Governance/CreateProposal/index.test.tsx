import { ThemeProvider } from "@mui/material";
import { fireEvent, render } from "@testing-library/react";
import { CreateProposalView } from "./index";
import React from "react";
import { lightTheme } from "styles/theme";

function renderComponent() {
  return render(
    <ThemeProvider theme={lightTheme}>
      <CreateProposalView />
    </ThemeProvider>
  );
}

describe("CreateProposalView", () => {
  it("checks if the component matches the snapshot", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  it("select pool incentivization proposal", () => {
    const { getByTestId, getByText } = renderComponent();
    const poolIncentivization = getByTestId("pool-incentivization-proposal-test");
    fireEvent.click(poolIncentivization);
    expect(getByText("Select a pool ID")).toBeInTheDocument();
  });
});

