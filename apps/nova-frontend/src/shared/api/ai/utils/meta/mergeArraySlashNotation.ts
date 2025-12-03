import { flatMap } from "lodash";
import type { ITransformModel } from "../../lib/formatModel/types/transform.type";

export const mergeArraySlashNotation = (
  array: ITransformModel[],
): ITransformModel => {
  const mergedProviders = {
    entries: flatMap(array, "entries"),
    forSelect: flatMap(array, "forSelect"),
  };
  return mergedProviders;
};
