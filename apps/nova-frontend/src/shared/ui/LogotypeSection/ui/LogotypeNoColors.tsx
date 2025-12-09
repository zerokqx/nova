import { ReactComponent as MonoLogo } from '@shared/assets/Group 4.svg';
import { Stack } from '@mantine/core';
import type { ILogotypeNoColors } from '../types/LogotypeNoColors.type';
export const LogotypeNoColors = ({ width = 16 }: ILogotypeNoColors) => {
  return (
    <Stack h={'100%'} pt={'sm'}>
      <MonoLogo style={{ opacity: 0.4 }} height={'max-content'} width={width} />
    </Stack>
  );
};
