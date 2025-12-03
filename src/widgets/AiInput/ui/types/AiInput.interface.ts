import type { StackProps } from "@mantine/core";
import type { TModels } from "@shared/api/ai/aiAbstract/types/models.type";
import type { TOnSubmitHandlerForm } from "@shared/ui/Form";

interface IAiInputFields {
  provider: TModels[number];
  content: string;
}

export interface IAiInputProps extends Omit<StackProps, "onSubmit"> {
  readOnly?: boolean;
  providers: TModels;
  onSubmit?: TOnSubmitHandlerForm<IAiInputFields>;
}
