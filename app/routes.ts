import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/page.tsx"),
  route("workspace/:id", "routes/workspace/page.tsx"),
] satisfies RouteConfig;
