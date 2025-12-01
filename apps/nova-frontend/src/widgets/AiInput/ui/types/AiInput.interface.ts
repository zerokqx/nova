import type { TModels } from "@shared/api/ai/aiAbstract/types/models.type";
import type { TOnSubmitHandlerForm } from "@shared/ui/Form";

interface IAiInputFields {
  provider: TModels[number];
  content: string;
}

export interface IAiInputProps {
  providers: TModels;
  onSubmit?: TOnSubmitHandlerForm<IAiInputFields>;
}
