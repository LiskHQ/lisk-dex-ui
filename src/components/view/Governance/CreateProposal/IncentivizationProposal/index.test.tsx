import { ThemeProvider } from "@mui/material";
import { render } from "@testing-library/react";
import { IncentivizationProposal } from "./index";
import React from "react";
import { lightTheme } from "styles/theme";

function renderComponent() {
  return render(
    <ThemeProvider theme={lightTheme}>
      <IncentivizationProposal />
    </ThemeProvider>
  );
}

describe("IncentivizationProposal", () => {
  it("checks if the component matches the snapshot", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });
});

