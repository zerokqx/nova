import { useMantineTheme } from "@mantine/core";
import { useAppForm } from "@shared/ui/Form";
import type { IAiInputProps } from "../ui/types/AiInput.interface";
import type { TProviders } from "../ui/types/providers.type";

export const useAiInputForm = (
  providers: TProviders,
  onSubmit: IAiInputProps["onSubmit"],
) => {
  const t = useMantineTheme();
  const form = useAppForm({
    defaultValues: {
      provider: providers[0].label ?? "",
      content: "",
    },
    onSubmit(props) {
      onSubmit?.(props);
      form.reset();
    },
  });

  return { t, form };
};
