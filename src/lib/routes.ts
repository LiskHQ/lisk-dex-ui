import { trimEnd } from "lodash-es";

export const generateRoute = (path: string, params: string[]) => {
  return [trimEnd(makePublicRoute(path), "/"), params.join("/")].join("/");
};

export const makePublicRoute = (path: string) => {
  return path;
};
