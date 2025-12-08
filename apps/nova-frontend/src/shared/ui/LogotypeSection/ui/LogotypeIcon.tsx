import LogotypeIconSvg from '@shared/assets/Group 3.svg?react';
import { motion } from 'motion/react';
import type { ILogotypeIcon } from '../types/LogotypeIconProps.type';
const Logo = motion.create(LogotypeIconSvg);
export const LogotypeIcon = ({
  width = 64,
  animate = true,
  onClick,
}: ILogotypeIcon) => {
  return (
    <Logo
      onClick={onClick}
      width={width}
      height={'max-content'}
      {...(animate && {
        initial: { opacity: 0, scale: 2 },
        animate: { opacity: 1, scale: 1 }, // 💡 Используем синтаксис объекта: ключ: значение
        transition: { duration: 0.5 }, // Добавим transition для лучшего эффекта
      })}
    />
  );
};
