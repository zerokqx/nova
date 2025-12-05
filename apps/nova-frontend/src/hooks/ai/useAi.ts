import type { AiSourceAbstact } from "@ai/ai-class.abstract";
import { useMutation } from "@tanstack/react-query";

export const useAi = <Ai extends AiSourceAbstact<unknown[]>>(source: Ai) => {
  const mutate = useMutation({
    mutationFn: ({
      model,
      content,
    }: {
      content: string;
      model?: Ai["models"][number];
    }) => source.sendMessage(content, model),
  });
  return mutate;
};
