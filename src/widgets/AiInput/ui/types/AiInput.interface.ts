import type { StackProps } from "@mantine/core";
import type { TOnSubmitHandlerForm } from "@shared/ui/Form";
import type { TProviders } from "./providers.type";
import type { TSourceAndModel } from "@shared/api/ai/lib/formatModel/types/metaSourceAndModel.type";

interface IAiInputFields {
  provider: TSourceAndModel;
  content: string;
}

export interface IAiInputProps extends Omit<StackProps, "onSubmit"> {
  readOnly?: boolean;
  providers: TProviders;
  onSubmit?: TOnSubmitHandlerForm<IAiInputFields>;
}
