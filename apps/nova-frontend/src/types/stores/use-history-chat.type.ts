export interface IMessage {
  role: string;
  message: string;
}
export type IHistoryChatStore = Record<string, IMessage>;
