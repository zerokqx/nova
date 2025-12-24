import { Modal, Space } from '@mantine/core';
import { IModalApiKeyComponent } from '../types/ModalApiKey.interface';
import { Add } from './Add';
import { Patch } from './Patch';
import { useResponsive } from '@/shared/lib/hooks/useResponsive';

export const ApiKeyModal: IModalApiKeyComponent = ({
  children,
  title,
  ...props
}) => {
  const { mobile } = useResponsive();
  return (
    <Modal title={title} centered={mobile} {...props}>
      <Space h={'1rem'} />
      {children}
    </Modal>
  );
};

ApiKeyModal.Add = Add;
ApiKeyModal.Patch = Patch;
