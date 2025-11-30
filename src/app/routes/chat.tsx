import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { zodValidator } from "@tanstack/zod-adapter";
export const Route = createFileRoute("/chat")({
  validateSearch: zodValidator(
    z.object({
      model: z.string().nonempty(),
      id: z.number().default(1),
    }),
  ),
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/chat"!</div>;
}
