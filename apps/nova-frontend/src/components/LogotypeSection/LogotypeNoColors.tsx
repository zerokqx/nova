import MonoLogo from "@assets/Group 4.svg?react";
import type { ILogotypeNoColors } from "./types/logotype-no-colors-props.type";
import { Flex, Stack } from "@mantine/core";
export const LogotypeNoColors = ({ width = 16 }: ILogotypeNoColors) => {
  return (
    <Stack h={"100%"} pt={"sm"}>
      <MonoLogo style={{ opacity: 0.4 }} height={"max-content"} width={width} />
    </Stack>
  );
};
