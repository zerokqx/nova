import type { ITransformModel } from "@shared/api/ai/lib/formatModel/types/transform.type";

export type TProviders = ITransformModel["forSelect"];
const t: TProviders = [{ label: "dw", value: "daw" }];
