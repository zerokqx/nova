import { split } from "lodash";
import type {
  TAfterSplit,
  TDeSlashNotatonFn,
} from "./types/deSlashNotation.type";
import type { TAiUrlSeparator } from "./types/metaSourceAndModel.type";

/**
 * @description Противоположная функция `namedModelForSelect`
 * @see `namedModelForSelect`
 */

export const deSlashNotation: TDeSlashNotatonFn = (value) => {
  const separator = "/" satisfies TAiUrlSeparator;
  const deFormt = split(value, separator) as TAfterSplit;
  return {
    source: deFormt[0],
    model: deFormt[1],
  };
};
