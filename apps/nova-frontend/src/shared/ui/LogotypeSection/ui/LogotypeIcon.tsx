import { ReactComponent as LogotypeIconSvg } from '@shared/assets/Group 3.svg';
import { motion, useAnimateMini, useMotionValue } from 'motion/react';
import type { ILogotypeIcon } from '../types/LogotypeIconProps.type';
import { useEffect, useState } from 'react';
const Logo = motion.create(LogotypeIconSvg);
export const LogotypeIcon = ({
  width = 64,
  animate = false,
  onClick,
}: ILogotypeIcon) => {
  const [scope, animateMotion] = useAnimateMini();
  useEffect(() => {
    if (animate) {
      animateMotion(
        scope.current,
        { rotate: '360deg', scale: [0.7, 1, 0.7] },
        {
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'linear',
          duration: 5,
        }
      );
    }
  }, [animate, animateMotion, scope]);
  return (
    <Logo ref={scope} onClick={onClick} width={width} height={'max-content'} />
  );
};
