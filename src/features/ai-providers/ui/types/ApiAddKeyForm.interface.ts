import type { TOnSubmitHandlerForm } from "@shared/ui/Form/ui/FormV2/types/onSubmitHandler.type";

interface ApiAddKeyFormFields {
  api: string;
}
export interface IApiAddKeyFormProps {
  onSubmit?: TOnSubmitHandlerForm<ApiAddKeyFormFields>;
}
