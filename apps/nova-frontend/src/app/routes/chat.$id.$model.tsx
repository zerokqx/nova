import { Chat } from "@pages/Chat/ui/Chat";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/chat/$id/$model")({
  component: Chat,
});
