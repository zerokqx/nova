import { forEach } from "lodash";
import { getAllMeta } from "../di/getAllMeta";
import type {
  TTransformModelForSelect,
  ITransformModel,
} from "./types/transform.type";
import { nameSlashNotation } from "./nameSlashNotation";

export const transformMetaModelsForSelect: TTransformModelForSelect = () => {
  const forSelect: ITransformModel["forSelect"] = [];
  const entries: ITransformModel["entries"] = [];
  const allMeta = getAllMeta();
  forEach(allMeta, (meta) => {
    const provider = meta.providerName;
    forEach(meta.models, (model) => {
      const value = nameSlashNotation(provider, model);
      const label = model;
      forSelect.push({ label, value });
      entries.push(value);
    });
  });
  return {
    entries,
    forSelect,
  };
};
