import { Button } from "@mui/material";
import { trimEnd } from "lodash-es";

import { makePublicRoute } from "../../../../../../lib/routes";

const generateRoute = (path: string, params: string[]) => {
  return [trimEnd(makePublicRoute(path), "/"), params.join("/")].join("/");
};

const NavMenuItems = [
  {
    name: "About",
    matcher: "/about",
    routeCallback: (params: string[] = []) => generateRoute("/about", params),
  },
  {
    name: "Help & Support",
    matcher: "/help&Support",
    routeCallback: (params: string[] = []) =>
      generateRoute("/help&Support", params),
  },
  {
    name: "Legal & Policy",
    matcher: "/legal&Policy",
    routeCallback: (params: string[] = []) =>
      generateRoute("/legal&Policy", params),
  },
  {
    name: "Wallet",
    matcher: "/wallet",
    routeCallback: (params: string[] = []) => generateRoute("/wallet", params),
  },
];
export default NavMenuItems;
