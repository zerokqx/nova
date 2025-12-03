import { filter } from "lodash";
import type { TSources } from "../../types/sources.type";
import { MetaController } from "../..";

export const getAllow = (allows: TSources[]) => {
  const allMeta = MetaController.getAll();

  return filter(allMeta, (meta) => allows.includes(meta.providerName));
};
