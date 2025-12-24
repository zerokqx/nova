import { useResponsive } from '@/shared/lib/hooks/useResponsive';
import { ActionIcon, ActionIconProps } from '@mantine/core';
import { ComponentProps } from 'react';
import { motion } from 'motion/react';

export const NavbarControlsActon = ({
  key,
  ...props
}: ActionIconProps & ComponentProps<'button'>) => {
  const { mobile } = useResponsive();
  return (
    <motion.div
      key={key}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, position: 'absolute', opacity: 1 }}
    >
      <ActionIcon bdrs={'xl'} size={mobile ? 'lg' : 'md'} {...props} />
    </motion.div>
  );
};
