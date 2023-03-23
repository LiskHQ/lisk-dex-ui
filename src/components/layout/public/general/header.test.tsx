import { useMediaQuery } from "@mui/material";
import { screen } from "@testing-library/react";
import React from "react";
import Header from "./header";
import { render } from "@testing-library/react";

jest.mock("@mui/material", () => ({
  ...(jest.requireActual("@mui/material") as object),
  useMediaQuery: jest.fn().mockReturnValue(false),
}));

jest.mock("./navbar/small-screen-nav", () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue("small-screen-nav"),
}));

jest.mock("components/layout/public/general/navbar/nav-menu/nav-menu", () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue("normal-nav-menu"),
}));

function renderComponent() {
  return render(<Header />);
}

describe("Header", () => {
  it("renders correctly on normal screen", () => {
    renderComponent();
    expect(screen.getByText("normal-nav-menu")).toBeInTheDocument();
    expect(screen.queryByText("small-screen-nav")).not.toBeInTheDocument();
  });

  it("renders correctly in small screen", async () => {
    (useMediaQuery as jest.Mock).mockReturnValue(true);
    renderComponent();
    expect(screen.getByText("small-screen-nav")).toBeInTheDocument();
    expect(screen.queryByText("normal-nav-menu")).not.toBeInTheDocument();
  });
});
