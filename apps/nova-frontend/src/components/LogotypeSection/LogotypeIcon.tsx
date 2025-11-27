import LogotypeIconSvg from "@assets/Group 3.svg?react";
import type { ILogotypeIcon } from "./types/logotype-icon-props.type";
import { motion } from "motion/react";
const Logo = motion.create(LogotypeIconSvg);
export const LogotypeIcon = ({ width = 64, animate = true }: ILogotypeIcon) => {
  return (
    <Logo
      width={width}
      height={"max-content"}
      {...(animate && {
        initial: { opacity: 0, scale: 2 }, // 💡 Используем синтаксис объекта: ключ: значение
        animate: { opacity: 1, scale: 1 }, // 💡 Используем синтаксис объекта: ключ: значение
        transition: { duration: 0.5 }, // Добавим transition для лучшего эффекта
      })}
    />
  );
};
