import type { IMetaClass } from "./types/meta.interface";

/**
 * @description Простой класс который содержит информацию о Ai провайдере
 */
export class Meta implements IMetaClass {
  public readonly providerName;
  public readonly models;
  public readonly defaultModel;
  public readonly thinking;
  constructor({ providerName, models, thinking, defaultModel }: IMetaClass) {
    this.providerName = providerName;
    this.models = models;
    this.thinking = thinking;
    this.defaultModel = defaultModel;
  }
}
