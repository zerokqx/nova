import { createStore } from "@colorfy-software/zfy";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAiProviders = createStore<string[]>("ai-providers", [], {
  persist: {
    getStorage: () => AsyncStorage,
  },
});
