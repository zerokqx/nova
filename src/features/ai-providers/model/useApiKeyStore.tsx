import { createStore } from "@colorfy-software/zfy";
import { has } from "lodash";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type {
  TUseApiKeyStore,
  IUseApiKeyActions,
} from "./types/useApiKeyStore.type";

export const useApiKeyStore = createStore<TUseApiKeyStore>(
  "api-keys",
  {},
  {
    persist: {
      getStorage: () => AsyncStorage,
    },
  },
);

export const apiKeyStoreActions: IUseApiKeyActions = {
  doGetApi: (key) => {
    return useApiKeyStore.getState().data[key];
  },
  doNewApiKey: (key, value) => {
    useApiKeyStore.getState().update((data) => {
      data[key] = value;
    });
  },

  doHasApiKey: (key) => {
    const store = useApiKeyStore.getState().data;
    return has(store, key);
  },
  doPutchApiKey: (key, value) => {
    useApiKeyStore.getState().update((s) => ({
      ...s,
      [key]: value,
    }));
  },
  doRemoveApi: (key) => {
    useApiKeyStore.getState().update((s) => {
      const copy = { ...s };
      delete copy[key];
      return copy;
    });
  },
};
