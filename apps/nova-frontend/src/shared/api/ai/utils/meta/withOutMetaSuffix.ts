import type { TSources } from "../../types/sources.type";
import type { TWithoutMetaSuffixFn } from "./types/witoutMetaSuffix.type";

export const withoutMetaSuffix: TWithoutMetaSuffixFn = (metaKey) =>
  metaKey.replace(/Meta$/, "") as TSources;
