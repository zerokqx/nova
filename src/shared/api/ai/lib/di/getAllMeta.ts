import { providers } from "../../container";
import { AIMETA } from "../symbols/symbols";
import type { TGetAllMetaFn } from "./types/getAllMeta.type";

/**
 * @returns All meta info from DI container
 */
export const getAllMeta: TGetAllMetaFn = () => {
  return Object.values(AIMETA).map((symbol) => providers.get(symbol));
};
