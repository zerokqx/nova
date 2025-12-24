import { MantineColor } from '@mantine/core';
import { ReactNode } from 'react';

export interface IMessageBlock {
  children?: ReactNode | ReactNode[];
  center?: boolean;
  message: string;
  title?: string;
  leftSection?: ReactNode;
  color?: MantineColor;
}
