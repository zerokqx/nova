import { ActionIcon } from "@mantine/core";
import stl from "./styles/animation.module.css";
import SendIcon from "@assets/send.svg?react";
import type { ISendButton } from "./types/send-button-props.type";

export const SendButton = ({ width = 16 }: ISendButton) => {
  const iconWidth = width;
  const actionIcon = iconWidth * 3;
  return (
    <ActionIcon className={stl.actionAnimation} size={actionIcon} bdrs={"lg"}>
      <SendIcon width={iconWidth} />
    </ActionIcon>
  );
};
