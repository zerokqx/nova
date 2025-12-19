import { createStore } from '@colorfy-software/zfy';
import { IUseNavbarStore } from './types/navbar-mode-store.interface';

const useNavbarStore = createStore<IUseNavbarStore>('navbar-mode', {
  sleect: false,
  selectedItems: [],
});

const doNewSelectItem = (id: string) => {
  useNavbarStore.setState((s) => ({
    data: {
      ...s.data,
      selectedItems: [...s.data.selectedItems, id],
    },
  }));
};

const doRemoveSelectItem = (id: string) => {
  useNavbarStore.setState((s) => ({
    data: {
      ...s.data,
      selectedItems: s.data.selectedItems.filter((item) => item !== id),
    },
  }));
};
const doClearSelectedItemArray = () => {
  useNavbarStore.setState((s) => ({
    data: {
      ...s.data,
      selectedItems: [],
    },
  }));
};
const doFindSelectItemIndex = (id: string): number => {
  return useNavbarStore.getState().data.selectedItems.indexOf(id);
};
const doRemoveLastSelectItem = () => {
  useNavbarStore.setState((s) => ({
    data: {
      ...s.data,
      selectedItems: s.data.selectedItems.slice(0, -1), // убираем последний
    },
  }));
};

const doAddAllToSelectedItems = (ids: string[]) => {
  useNavbarStore.setState((s) => ({
    data: {
      ...s.data,
      selectedItems: ids,
    },
  }));
};

export {
  doNewSelectItem,
  doRemoveSelectItem,
  doClearSelectedItemArray,
  doRemoveLastSelectItem,
  doFindSelectItemIndex,
  doAddAllToSelectedItems,
  useNavbarStore,
};
