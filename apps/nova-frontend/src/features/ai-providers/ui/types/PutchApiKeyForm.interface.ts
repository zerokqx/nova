import type { TOnSubmitHandlerForm } from "@shared/ui/Form";

export interface IPuthcApiKeyFormFieldData {
  api: string;
}
export interface IPutchApiKeyFormProps {
  initial: IPuthcApiKeyFormFieldData;
  onSubmit: TOnSubmitHandlerForm<IPuthcApiKeyFormFieldData>;
}
