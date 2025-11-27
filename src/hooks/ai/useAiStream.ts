import type { AiSourceAbstact } from "@ai/ai-class.abstract";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export const useAiStream = <Ai extends AiSourceAbstact<unknown[]>>(
  source: Ai,
) => {
  const [content, setContent] = useState<string>("");
  const mutate = useMutation({
    mutationFn: async ({
      model,
      content,
    }: {
      content: string;
      model?: Ai["models"][number];
    }) => {
      const response = await source.sendMessageStream(content, model as string);
      for await (const chunk of response) {
        setContent((prev) => prev + chunk.text);
      }
      return content;
    },
  });
  return { mutate, content };
};
