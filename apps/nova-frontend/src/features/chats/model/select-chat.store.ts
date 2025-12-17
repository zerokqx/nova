import { components } from '@/shared/types/schema';
import { createStore } from '@colorfy-software/zfy';

type Id = components['schemas']['ChatEntity']['id'];

export const useSelectedChatStore = createStore<Id | null>('selected-chat', '');

export const doSelect = (id: Id) => {
  useSelectedChatStore.setState({ data: id });
};
