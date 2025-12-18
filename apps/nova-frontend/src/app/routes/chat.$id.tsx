import { selectChatFetch } from '@/features/chats/api/select-chat';
import { Chat } from '@pages/Chat/ui/Chat';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/chat/$id')({
  component: Chat,
  loader: async ({ params: { id } }) => selectChatFetch(id),
});
