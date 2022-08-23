import { render, fireEvent } from "@testing-library/react";
import React from "react";
import SmallScreenNav from "./small-screen-nav";

function renderComponent() {
  return render(<SmallScreenNav />);
  //export default withLayout(<General />)(LiskHome);
}

describe("General layout", () => {
  it("triggers correctly on clicking icon button", () => {
    const { getByTestId } = renderComponent();
    const iconButton = getByTestId("small-screen-nav-button");
    fireEvent.click(iconButton);
    expect(getByTestId("small-screen-nav-button")).toMatchSnapshot();
  });

  it("opens and closes correctly on clicking the drawer and taping escape key", () => {
    const { getByTestId, container } = renderComponent();
    const iconButton = getByTestId("small-screen-nav-button");
    fireEvent.click(iconButton);
    const drawer = getByTestId("small-screen-nav");
    fireEvent.keyDown(drawer, {
      key: "Escape",
      code: "Escape",
    });
    expect(container).toMatchSnapshot();
  });
});
