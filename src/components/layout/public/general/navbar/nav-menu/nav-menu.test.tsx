import React from "react";
import NavMenu from "./nav-menu";
import { render } from "@testing-library/react";

const useRouter = jest.spyOn(require("next/router"), "useRouter");

function renderComponent(props: { isVerticalMenu?: boolean }) {
  return render(<NavMenu isVerticalMenu={props.isVerticalMenu} />);
}

export function mockNextUseRouter(props: {
  route: string;
  pathname: string;
  query: string;
  asPath: string;
}) {
  useRouter.mockImplementationOnce(() => ({
    route: props.route,
    pathname: props.pathname,
    query: props.query,
    asPath: props.asPath,
  }));
}

describe("General layout", () => {
  mockNextUseRouter({
    route: "/mosques/search/[...params]",
    pathname: "/mosques/search/[...params]",
    query: JSON.stringify({
      params: ["New York", "40.712776,-74.005974", "40.712776,-74.005974"],
    }),
    asPath: `/mosques/search/${encodeURIComponent(
      "New York"
    )}/40.712776,-74.005974/40.712776,-74.005974`,
  });

  it("renders correctly with vertical menu", () => {
    const { container } = renderComponent({ isVerticalMenu: true });
    expect(container).toMatchSnapshot();
  });

  it("renders correctly without vertical menu", () => {
    const { container } = renderComponent({ isVerticalMenu: false });
    expect(container).toMatchSnapshot();
  });
});
