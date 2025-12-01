import { createStore } from "@colorfy-software/zfy";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type {
  IUseAiProvidersAction,
  TUseAiProvidersStore,
} from "./types/useAiProvidersStore.types";

export const useAiProviders = createStore<TUseAiProvidersStore>(
  "ai-providers",
  [],
  {
    persist: {
      getStorage: () => AsyncStorage,
    },
  },
);

export const aiProvidersAction: IUseAiProvidersAction = {
  doAdd: (value) => {
    useAiProviders.getState().update((s) => s.push(value));
  },

  doHas: (value) => useAiProviders.getState().data.includes(value),
  doRemove: (value) => {
    useAiProviders.getState().update((s) => {
      const idx = s.indexOf(value);
      if (idx > -1) s.splice(idx, 1);
    });
  },
};
