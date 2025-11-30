import { providers } from "../../container";
import { withoutMetaSuffix } from "../../utils/meta/withOutMetaSuffix";
import { AI } from "../symbols/symbols";
import type { TGetByMetaNameFn } from "./types/getByMetaName.type";

export const getByMetaName: TGetByMetaNameFn = (metaName) => {
  return providers.get(AI[withoutMetaSuffix(metaName)]);
};
