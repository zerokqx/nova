import { IAiCardProps } from './AiCard.interface';
import { IModalApiKeySubmitFunctionParams } from './ModalApiKey.interface';

export interface IControlsAiCard {
  onDelete?: (bdRecord: IAiCardProps['dbRecordInstance']) => void;
  onPut?: (
    bdRecord: IAiCardProps['dbRecordInstance'],
    form: IModalApiKeySubmitFunctionParams,

    modal: {
      toggle: () => void;
    }
  ) => void;
  onCreate?: (
    bdRecord: IAiCardProps['dbRecordInstance'],
    form: IModalApiKeySubmitFunctionParams,

    modal: {
      toggle: () => void;
    }
  ) => void;
}
