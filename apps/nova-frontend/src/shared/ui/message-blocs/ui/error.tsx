import { Space, Text } from '@mantine/core';
import { IMessageBlock } from './types/message.interface';
import { AlertBlock } from './alert';

export const ErrorMessage = ({
  children,
  title,
  message,
  color,
  leftSection,
  center,
}: IMessageBlock) => {
  return (
    <AlertBlock
      m={center ? '0 auto' : 'none'}
      icon={leftSection}
      title={title || 'Ошибка'}
      color={color || 'red.9'}
      withCloseButton={false}
    >
      <Text size="sm">{message}</Text>
      {children && <Space h="1rem" />}
      {children}
    </AlertBlock>
  );
};
