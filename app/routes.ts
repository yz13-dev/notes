import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/page.tsx"),
  route("home", "routes/home/page.tsx"),
] satisfies RouteConfig;
