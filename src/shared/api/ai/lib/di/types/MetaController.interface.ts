import type { TGetAllMetaFn } from "./getAllMeta.type";
import type { TGetByMetaNameFn } from "./getByMetaName.type";
import type { TGetMetaWithSource } from "./getMetaWithSource.type";

export interface IMetaController {
  getAll: TGetAllMetaFn;
  getByMetaName: TGetByMetaNameFn;
  getMetaWithSource: TGetMetaWithSource;
}
