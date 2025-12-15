import { Modal } from '@mantine/core';
import { IModalApiKeyComponent } from '../types/ModalApiKey.interface';
import { Add } from './Add';

export const ApiKeyModal: IModalApiKeyComponent = ({ children, ...props }) => {
  return <Modal {...props}>{children}</Modal>;
};

ApiKeyModal.Add = Add;
