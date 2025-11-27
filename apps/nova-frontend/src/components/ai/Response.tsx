import { Stack } from "@mantine/core";
import Markdown from "react-markdown";

export const AiResponse = ({ content }: { content: string }) => {
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
