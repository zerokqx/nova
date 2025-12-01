import { Stack } from "@mantine/core";
import Markdown from "react-markdown";
import type { IAiResponseProps } from "./types/AiResponse.interface";

export const AiResponse = ({ content }: IAiResponseProps) => {
  return (
    <Stack
      bdrs={"xs"}
      p={"md"}
      w={700}
      bg={"black"}
      styles={{
        root: {
          overflowY: "auto",
        },
      }}
    >
      <Markdown>{content}</Markdown>
    </Stack>
  );
};
