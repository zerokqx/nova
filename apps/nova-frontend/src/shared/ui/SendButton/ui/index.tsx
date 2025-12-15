import { ActionIcon } from '@mantine/core';
import styles from './styles/animation.module.css';
import type { ISendButton } from '../types/SendButtonProps.type';
import { Send } from 'lucide-react';

export const SendButton = ({ width = 16 }: ISendButton) => {
  const iconWidth = width;
  const actionIcon = iconWidth * 3;
  return (
    <ActionIcon
      className={styles.actionAnimation}
      size={actionIcon}
      bdrs={'lg'}
    >
      <Send width={iconWidth} />
    </ActionIcon>
  );
};
