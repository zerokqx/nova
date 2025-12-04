import { useMantineTheme } from "@mantine/core";
import { useAppForm } from "@shared/ui/Form";
import type { IAiInputProps } from "../ui/types/AiInput.interface";
import type { TProviders } from "../ui/types/providers.type";

export const useAiInputForm = (
  providers: TProviders,
  onSubmit: IAiInputProps["onSubmit"],
) => {
  const t = useMantineTheme();
  console.log(providers);
  const form = useAppForm({
    defaultValues: {
      provider: providers[0].value || "",
      content: "",
    },
    onSubmit(props) {
      onSubmit?.(props);
      form.reset();
    },
  });

  return { t, form };
};
