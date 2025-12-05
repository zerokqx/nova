import { Code, Group, Stack, Text, useMantineTheme } from '@mantine/core';
import type { IMessageProps } from './types/Message.interface';
import { useState } from 'react';
import { ShowMoreButton } from './ShowMoreButton';
import { CopyButton } from '@shared/ui/CopyButton';
import { motion } from 'motion/react';
import { DeleteButton } from '@shared/ui/DeleteButton/ui';
import { MessagesDB } from '../model';

const MoitonCopy = motion.create(CopyButton);
export const Message = ({
  message: { role, content, id },
  ...props
}: IMessageProps) => {
  const t = useMantineTheme();
  const lenght = content.length > 300;
  const [hidden, setHidden] = useState(lenght);
  const height = hidden ? 8 : 0;
  return (
    <Stack {...props} align={role === 'assistent' ? 'start' : 'end'}>
      <Text
        lineClamp={height}
        maw={{ base: '100%', sm: '50%' }}
        bdrs={'sm'}
        p={'sm'}
        bg={'blue.6'}
        style={{
          wordWrap: 'break-word',
          overflowY: 'hidden',
          whiteSpace: 'pre-wrap', // ✅ перенос \n
        }}
        dangerouslySetInnerHTML={{ __html: content }}
      ></Text>
      <Group>
        {lenght && (
          <ShowMoreButton onClick={() => setHidden(!hidden)} show={hidden} />
        )}
        <MoitonCopy
          copyTarget={content}
          bg={'dark.9'}
          whileTap={{
            backgroundColor: t.colors.green[7],
            rotate: 180,
          }}
        />
        <DeleteButton
          onClick={() => {
            MessagesDB.removeMessage({ id });
          }}
        />
      </Group>
    </Stack>
  );
};
