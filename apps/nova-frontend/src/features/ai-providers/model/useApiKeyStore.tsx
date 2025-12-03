import { createStore } from "@colorfy-software/zfy";
import { has, keys } from "lodash";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type {
  TUseApiKeyStore,
  IUseApiKeyActions,
  Key,
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
  doKeys: () => {
    return keys(useApiKeyStore.getState().data) as Key[];
  },
  doGetApi: (key) => {
    return useApiKeyStore.getState().data[key];
  },

  doNewApiKey: (key, value) => {
    console.log("Saving key:", key, "with value:", value);
    useApiKeyStore.getState().update((data) => {
      data[key] = value;
    });
  },

  doHasApiKey: (key) => {
    const store = useApiKeyStore.getState().data;
    return has(store, key);
  },
  doPutchApiKey: (key, value) => {
    useApiKeyStore.getState().update((s) => {
      s[key] = value;
    });
  },
  doRemoveApi: (key) => {
    useApiKeyStore.getState().update((s) => {
      delete s[key];
    });
  },
};
