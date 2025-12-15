import { TOnSubmitHandlerForm } from '@/shared/ui/Form';
import { ReactNode } from 'react';

export interface IModalApiKeyProps {
  title?: string;
  onClose: () => void;
  opened: boolean;
  children: ReactNode;
}
export type IModalApiKeySubmitFunction = TOnSubmitHandlerForm<{
  apiKey: string;
}>;
export type IModalApiKeySubmitFunctionParams =
  Parameters<IModalApiKeySubmitFunction>[0];
export interface IModalApiKeyAddProps {
  onSubmit: IModalApiKeySubmitFunction;
}

export interface IModalApiKeyPatchProps {
  onSubmit: IModalApiKeySubmitFunction;
  current: string;
}
export interface IModalApiKeyComponent {
  (props: IModalApiKeyProps): ReactNode;
  Add: (props: IModalApiKeyAddProps) => ReactNode;
  Patch: (props: IModalApiKeyPatchProps) => ReactNode;
}
