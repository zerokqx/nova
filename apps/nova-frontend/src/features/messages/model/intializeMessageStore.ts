import { createStore } from '@colorfy-software/zfy';

export const useInitializeMessageStore = createStore(
  'initialize-message',
  '',
  {}
);

export const doSetInitMessage = (text: string) => {
  useInitializeMessageStore.setState({ data: text });
};
export const doGetInitMessage = () => useInitializeMessageStore.getState().data;
