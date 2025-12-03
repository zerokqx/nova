import { forEach, map } from "lodash";
import { getAllMeta } from "../di/getAllMeta";
import type {
  TTransformModelForSelect,
  ITransformModel,
} from "./types/transform.type";
import { nameSlashNotation } from "./nameSlashNotation";
import type { TModels } from "../../aiAbstract/types/models.type";
import type { TSources } from "../../types/sources.type";
import { MetaController } from "../..";

export const transformMetaModelsForSelect: TTransformModelForSelect = () => {
  const forSelect: ITransformModel["forSelect"] = [];
  const entries: ITransformModel["entries"] = [];
  const allMeta = MetaController.getAll();
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

export const toSlashNotation = (source: TSources, models: TModels) => {
  const slashNotation = { entries: [], forSelect: [] } as ITransformModel;
  models.forEach((model) => {
    const name = nameSlashNotation(source, model);
    slashNotation.entries.push(name);
    slashNotation.forSelect.push({ label: model, value: name });
  });
  return slashNotation;
};
