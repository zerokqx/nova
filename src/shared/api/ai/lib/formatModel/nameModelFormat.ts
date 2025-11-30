import { split } from "lodash";
import type {
  TAfterSplit,
  TDeSlashNotatonFn,
} from "./types/deSlashNotation.type";

/**
 * @description Противоположная функция `namedModelForSelect`
 * @see `namedModelForSelect`
 */
export const deSlashNotation: TDeSlashNotatonFn = (value) => {
  const deFormt = split(value, "/") as TAfterSplit;
  return {
    source: deFormt[0],
    model: deFormt[1],
  };
};
