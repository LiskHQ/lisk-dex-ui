import { ThemeProvider } from "@mui/material";
import { fireEvent, render } from "@testing-library/react";
import { ISettingsModalProps, SettingsModal } from "./index";
import React from "react";
import { lightTheme } from "styles/theme";

function renderComponent(props: ISettingsModalProps) {
  return render(
    <ThemeProvider theme={lightTheme}>
      <SettingsModal {...props} />
    </ThemeProvider>
  );
}

describe("SettingsModal", () => {
  it("checks if the component matches the snapshot", () => {
    const { container } = renderComponent({});
    expect(container).toMatchSnapshot();
  });

  it("cancel button click", () => {
    const onClose = jest.fn();
    const { getByTestId } = renderComponent({
      onClose,
    });

    const closeButton = getByTestId("settings-modal-confirm-test");
    fireEvent.click(closeButton);

    expect(onClose).toBeCalled();
  });
});

