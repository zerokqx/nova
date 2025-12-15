import { Grid, Group, Text } from '@mantine/core';
import { useAiCard } from '../../../model/ustAiCardProvider';
import { IAiCardComponent } from '../../types/AiCard.interface';
import { Icon } from './Icon';
import { Title } from './Title';

export const Header: IAiCardComponent['Header'] = ({ children }) => {
  const { byCreated } = useAiCard();
  return (
    <Grid.Col span={12}>
      <Group justify="space-between">
        <Group>{children}</Group>
        <Text>{byCreated}</Text>
      </Group>
    </Grid.Col>
  );
};

Header.Icon = Icon;
Header.Title = Title;
