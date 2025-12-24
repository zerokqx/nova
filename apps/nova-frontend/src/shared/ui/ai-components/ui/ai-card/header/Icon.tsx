import { Image } from '@mantine/core';
import { useAiCard } from '../../../model/ustAiCardProvider';
import { IAiCardComponent } from '../../types/AiCard.interface';

export const Icon: IAiCardComponent['Header']['Icon'] = ({ size = 32 }) => {
  const { iconUrl } = useAiCard();
  return iconUrl && <Image w={size} h={size} src={iconUrl} />;
};
