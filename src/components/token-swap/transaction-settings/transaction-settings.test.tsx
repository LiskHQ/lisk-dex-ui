import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import SettingsPopup from "./settings-popup";
import { fireEvent, render } from "@testing-library/react";

const renderComponent = () => {
  return render(
    <SettingsPopup />
  );
};

describe("SearchBox component", () => {
  it("checks if the component matches the snapshot", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  
  it("checks if text component renders correctly when script is loaded", () => {
    const component = renderComponent();
    const settingsButton = component.getByTestId("md-outline-settings");
    fireEvent.click(settingsButton);
    expect(component.getByTestId("transaction-settings")).toBeInTheDocument();
  });

  it("checks if slippeage tolerance is being set", () => {
    const handleSlippeageTolerance = jest.fn();
    const wrapper = render(
      <SettingsPopup handleSlippeageTolerance={handleSlippeageTolerance} />
    );
    const settingsButton = wrapper.getByTestId("md-outline-settings");
    fireEvent.click(settingsButton);
    expect(wrapper.getByTestId("transaction-settings")).toBeInTheDocument();
    const slippeageTolearanceBtn = wrapper.getByTestId(
      "slippeage-tolearance-0.5%"
    );
    fireEvent.click(slippeageTolearanceBtn);
    expect(handleSlippeageTolerance).toHaveBeenCalled();
  });

  it("checks if transaction deadline is being set", () => {
    const handleTransactionDeadline = jest.fn();
    const wrapper = render(
      <SettingsPopup handleTransactionDeadline={handleTransactionDeadline} />
    );
    const settingsButton = wrapper.getByTestId("md-outline-settings");
    fireEvent.click(settingsButton);
    expect(wrapper.getByTestId("transaction-settings")).toBeInTheDocument();
    const transactionDeadline = wrapper.getByTestId("transaction-deadline");
    fireEvent.change(transactionDeadline, { target: { value: "2" } });
    expect(handleTransactionDeadline).toHaveBeenCalled();
  });
});
