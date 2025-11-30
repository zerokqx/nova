import type { SelectProps } from "@mantine/core";
import type { TSourceAndModel } from "./metaSourceAndModel.type";
import type { Fn } from "@shared/types/functions/fn.type";

export interface ITransformModel {
  forSelect: NonNullable<SelectProps["data"]>[number][];
  entries: TSourceAndModel[];
}
export type TTransformModelForSelect = Fn<[], ITransformModel>;
