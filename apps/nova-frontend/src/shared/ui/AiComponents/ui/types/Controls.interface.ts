import { useToggle } from '@mantine/hooks';
import { IAiCardProps } from './AiCard.interface';
import { IModalApiKeySubmitFunctionParams } from './ModalApiKey.interface';

interface IModalControls {
  toggle: ReturnType<typeof useToggle>[1];
}

export interface IControlsAiCard {
  onDelete?: (bdRecord: IAiCardProps['dbRecordInstance']) => void;
  onPut?: (
    bdRecord: IAiCardProps['dbRecordInstance'],
    form: IModalApiKeySubmitFunctionParams,
    modal: IModalControls
  ) => void;
  onCreate?: (
    bdRecord: IAiCardProps['dbRecordInstance'],
    form: IModalApiKeySubmitFunctionParams,
    modal: IModalControls
  ) => void;
}
