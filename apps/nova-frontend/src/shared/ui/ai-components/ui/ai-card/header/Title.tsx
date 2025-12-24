import { Title as T } from '@mantine/core';
import { useAiCard } from '../../../model/ustAiCardProvider';
import { capitalize } from 'lodash';
import { IAiCardComponent } from '../../types/AiCard.interface';
export const Title: IAiCardComponent['Header']['Title'] = () => {
  const { name, available } = useAiCard();

  const color = available ? 'blue' : 'dark';
  return <T c={color}>{capitalize(name)}</T>;
};
