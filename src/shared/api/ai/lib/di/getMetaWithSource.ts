import { providers } from "../../container";
import { metaKey } from "../../utils/meta/metaKey";
import { AI, AIMETA } from "../symbols/symbols";
import type { TGetMetaWithSource } from "./types/getMetaWithSource.type";

/**
 * @param key - Имя провайдера к которому хотим получить meta и source
 */
export const getMetaWithSource: TGetMetaWithSource = (key) => {
  const symbolSource = AI[key];
  const symbolMeta = AIMETA[metaKey(key)];
  return {
    source: providers.get(symbolSource),
    meta: providers.get(symbolMeta),
  };
};
