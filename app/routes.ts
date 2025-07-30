import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  route("login", "routes/login/page.tsx"),
  layout("routes/layout.tsx", [
    index("routes/page.tsx"),
    route("workspace/new", "routes/workspace/new/page.tsx"),
    route("workspace/:id", "routes/workspace/[id]/page.tsx"),
    route("workspace/:id/new", "routes/workspace/[id]/new/page.tsx"),
    route("workspace/:id/:noteId", "routes/workspace/[id]/[noteId]/page.tsx"),
  ]),
] satisfies RouteConfig;
