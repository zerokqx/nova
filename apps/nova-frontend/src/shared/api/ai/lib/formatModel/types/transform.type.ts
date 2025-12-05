import type { ComboboxData, ComboboxItem } from "@mantine/core";
import type { TAiUrl } from "./metaSourceAndModel.type";
import type { Fn } from "@shared/types/functions/fn.type";

export interface ITransformModel {
  forSelect: ComboboxItem[];
  entries: TAiUrl[];
}
export type TTransformModelForSelect = Fn<[], ITransformModel>;
