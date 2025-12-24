import { ReactNode } from 'react';
import { IAiCardProps } from './AiCard.interface';
import { IModalApiKeySubmitFunctionParams } from './ModalApiKey.interface';

interface IModalControls {
  toggle: () => void;
}

export interface IControlsAiCardProps {
  renderForNotApiKey?: ReactNode[];

  renderForApiKey?: ReactNode[];
  children?: ReactNode;
  callbacks: {
    onDelete?: (bdRecord: IAiCardProps['sources']) => void;
    onPut?: (
      bdRecord: IAiCardProps['sources'],
      form: IModalApiKeySubmitFunctionParams,
      modal: IModalControls
    ) => void;
    onCreate?: (
      bdRecord: IAiCardProps['sources'],
      form: IModalApiKeySubmitFunctionParams,
      modal: IModalControls
    ) => void;
  };
}

export interface IControlsCopyActionProps {
  value: string;
}
export interface IControlsComponent {
  (props: IControlsAiCardProps): ReactNode;
  Copy: (props: IControlsCopyActionProps) => ReactNode;
}
