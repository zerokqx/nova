import type { TSources } from "@shared/api/ai/types/sources.type";
import type { Fn } from "@shared/types/functions/fn.type";
import type { IGetMetaWithSource } from "./getMetaWithSource.interface";

export type TGetMetaWithSource = Fn<[TSources], IGetMetaWithSource | undefined>;
