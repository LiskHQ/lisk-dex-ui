import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { screen, fireEvent, render } from "@testing-library/react";
import PriceInputBox from "./price-input-box";

const renderComponent = () => {
  return render(<PriceInputBox defaultText={"Current LSK per ETH price"} />);
};

describe("PriceInputBox component", () => {
  it("checks if the component matches the snapshot", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  it("checks if input is working correctly on entering text", () => {
    const wrapper = renderComponent();
    const amountInput = wrapper.getByTestId("amount-input");
    fireEvent.change(amountInput, { target: { value: "2000" } });
    expect(screen.getByTestId("amount-input")).toHaveValue("2000");
  });
});
