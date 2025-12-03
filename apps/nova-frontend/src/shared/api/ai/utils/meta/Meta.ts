import { toString } from "lodash";
import { toSlashNotation } from "../../lib/formatModel/modelsForSelect";
import type { ITransformModel } from "../../lib/formatModel/types/transform.type";
import type { IMetaClass } from "./types/meta.interface";

/**
 * @description Простой класс который содержит информацию о Ai провайдере
 */
export class Meta implements IMetaClass {
  providerName;
  models;
  defaultModel;
  thinking;
  _slashNotation!: ITransformModel;
  constructor({
    providerName,
    models,
    thinking,
    defaultModel,
  }: Omit<IMetaClass, "slashNotation">) {
    this.providerName = providerName;
    this.models = models;
    this.thinking = thinking;
    this.defaultModel = defaultModel;
  }
  public get slash() {
    return toSlashNotation(this.providerName, this.models);
  }
}
