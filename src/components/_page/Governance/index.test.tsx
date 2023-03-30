import { ThemeProvider } from "@mui/material";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { lightTheme } from "styles/theme";
import Governance from ".";

function renderComponent() {
  return render(
    <ThemeProvider theme={lightTheme}>
      <Governance />
    </ThemeProvider>
  );
}

describe("Governance", () => {
  it("checks if the component matches the snapshot", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  it("create a proposal work", () => {
    const { getByTestId } = renderComponent();
    const link = getByTestId("create-proposal");
    fireEvent.click(link.parentNode as Node);

    expect(link).toHaveAttribute("href", "/governance/create");
  });
});

