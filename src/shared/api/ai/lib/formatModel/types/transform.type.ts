import type { ComboboxData, ComboboxItem } from "@mantine/core";
import type { TSourceAndModel } from "./metaSourceAndModel.type";
import type { Fn } from "@shared/types/functions/fn.type";

export interface ITransformModel {
  forSelect: ComboboxItem[];
  entries: TSourceAndModel[];
}
export type TTransformModelForSelect = Fn<[], ITransformModel>;
