import { ActionIcon } from '@mantine/core';
import { IControlsComponent } from '../../types/Controls.interface';
import { Copy as CopyLucide } from 'lucide-react';
import { useClipboard } from '@mantine/hooks';
export const Copy: IControlsComponent['Copy'] = ({ value }) => {
  const clipboard = useClipboard();
  if (!value) throw Error('Not pass value prop');
  return (
    <ActionIcon color="dark.9" onClick={() => clipboard.copy(value)}>
      <CopyLucide size={16} />
    </ActionIcon>
  );
};
