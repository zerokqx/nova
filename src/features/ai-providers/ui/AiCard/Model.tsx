import { Badge } from "@mantine/core";
import type { IModelProps } from "../types/Model.interface";
import shineStyles from "@shared/styles/effects/Shine.module.css";
import scaleStyles from "@shared/styles/effects/Scale.module.css";

export const Model = ({ name }: IModelProps) => {
  return (
    <Badge className={`${shineStyles.main} ${scaleStyles.main}`}>{name}</Badge>
  );
};
