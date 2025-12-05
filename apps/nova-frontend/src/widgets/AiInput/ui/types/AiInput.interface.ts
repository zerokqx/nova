import type { StackProps } from "@mantine/core";
import type { TOnSubmitHandlerForm } from "@shared/ui/Form";
import type { TProviders } from "./providers.type";
import type { TAiUrl } from "@shared/api/ai/lib/formatModel/types/metaSourceAndModel.type";

interface IAiInputFields {
  provider: string;
  content: string;
}

export interface IAiInputProps extends Omit<StackProps, "onSubmit"> {
  readOnly?: boolean;
  providers: TProviders;
  onSubmit?: TOnSubmitHandlerForm<IAiInputFields>;
}
