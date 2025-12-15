import { Grid, Group, Badge, Text } from '@mantine/core';
import { useAiCard } from '../../../model/ustAiCardProvider';

export const Models = () => {
  const { models } = useAiCard();
  return (
    <Grid.Col span={12}>
      <Group
        grow={false}
        style={{
          flexShrink: 0,
          overflowX: 'auto',
        }}
      >
        {models.length > 0 ? (
          models.map((model) => <Badge>{model.name}</Badge>)
        ) : (
          <Text c={'yellow'}>Для данного провайдера еще нету моделей.</Text>
        )}
      </Group>
    </Grid.Col>
  );
};
