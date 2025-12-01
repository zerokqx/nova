import { useMantineTheme } from "@mantine/core";
import type { TModels } from "@shared/api/ai/aiAbstract/types/models.type";
import { useAppForm } from "@shared/ui/Form";
import type { IAiInputProps } from "../ui/types/AiInput.interface";

export const useAiInputForm = (
  providers: TModels,
  onSubmit: IAiInputProps["onSubmit"],
) => {
  const t = useMantineTheme();
  const form = useAppForm({
    defaultValues: {
      provider: providers[0] ?? "",
      content: "",
    },
    onSubmit,
  });

  return { t, form };
};
