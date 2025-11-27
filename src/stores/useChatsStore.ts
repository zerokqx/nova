import { createStore } from "@colorfy-software/zfy";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { TUseChatsStore } from "@t/stores/use-chats.type";

export const useChats = createStore<TUseChatsStore>("chats-store", [], {
  persist: {
    getStorage: () => AsyncStorage,
  },
});
