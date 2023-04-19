import { ThemeProvider } from "@mui/material";
import { fireEvent, render } from "@testing-library/react";
import { TransactionStatusModal } from "./index";
import React from "react";
import { lightTheme } from "styles/theme";

function renderComponent(props: {
  onClose?: () => void
}) {
  return render(
    <ThemeProvider theme={lightTheme}>
      <TransactionStatusModal {...props} />
    </ThemeProvider>
  );
}

describe("TransactionStatusModal", () => {
  it("checks if the component matches the snapshot", () => {
    const { container } = renderComponent({});
    expect(container).toMatchSnapshot();
  });

  it("cancel button click", () => {
    const onClose = jest.fn();
    const { container, getByText } = renderComponent({
      onClose,
    });

    const closeButton = getByText("Close");
    fireEvent.click(closeButton);

    expect(onClose).toBeCalled();
  });
});

