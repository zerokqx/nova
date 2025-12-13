import { UIMessage } from '@ai-sdk/react';
import type { IMessage } from '@entities/messages/model';

export interface IMessageProps {
  message: UIMessage<unknown, UIDataTypes, UITools>[];
}
