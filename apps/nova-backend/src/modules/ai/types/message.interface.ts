import { type ModelMessage } from 'ai';

export interface IMessage {
  role: ModelMessage['role'];
  content: ModelMessage['content'];
  model: ModelMessage;
  chatId: number;
}
