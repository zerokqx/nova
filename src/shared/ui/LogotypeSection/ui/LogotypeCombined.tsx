import { Group, type GroupProps } from "@mantine/core";
import { LogotypeIcon } from "./LogotypeIcon";
import { LogotypeText } from "./LogotypeText";

export const LogotypeCombined = ({ ...props }: GroupProps) => {
  return (
    <Group h={"max-content"} w={"max-content"} {...props}>
      <LogotypeIcon />
      <LogotypeText />
    </Group>
  );
};
