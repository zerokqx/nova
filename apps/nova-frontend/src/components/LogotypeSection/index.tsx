import NovaText from "@assets/Nova.svg?react";
import type { ILogotypeText } from "./types/logotype-props.type";
export const LogotypeText = ({ width = 128 }: ILogotypeText) => {
  return <NovaText height={"max-content"} width={width} />;
};
