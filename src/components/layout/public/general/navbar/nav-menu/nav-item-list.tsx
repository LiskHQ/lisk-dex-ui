import { trimEnd } from "lodash-es";
import { makePublicRoute } from "../../../../../../lib/routes";

const generateRoute = (path: string, params: string[]) => {
  return [trimEnd(makePublicRoute(path), "/"), params.join("/")].join("/");
};

const NavMenuItems = [
  {
    name: "Swap",
    matcher: "/swap",
    routeCallback: (params: string[] = []) => generateRoute("/swap-tokens", params),
  },
  {
    name: "Pool",
    matcher: "/pool",
    routeCallback: (params: string[] = []) =>
      generateRoute("/liquidity-home", params),
  },
  {
    name: "Vote",
    matcher: "/vote",
    routeCallback: (params: string[] = []) =>
      generateRoute("/vote", params),
  },
  {
    name: "Charts",
    matcher: "/charts",
    routeCallback: (params: string[] = []) => generateRoute("/charts", params),
  },
];
export default NavMenuItems;
