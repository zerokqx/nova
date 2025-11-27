import type { CreateStoreType } from "@colorfy-software/zfy";
import type { IBaseActionForArray } from "@t/utils/base-actions-for-array.type";

export const createBaseActionsForArray = <E extends unknown[]>(
  useStore: CreateStoreType<E>,
): IBaseActionForArray<E> => {
  const updater = useStore.getState().update;
  return;
};
