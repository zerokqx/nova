import { Grid, List, Stack, Title } from '@mantine/core';
import { useAiCard } from '../../../model/ustAiCardProvider';
import { map } from 'lodash';
import { IAiCardComponent } from '../../types/AiCard.interface';
import { Dot } from 'lucide-react';

export const BestUseCases: IAiCardComponent['BestUseCases'] = ({ title }) => {
  const { bestUseCases } = useAiCard();
  return (
    bestUseCases.length > 0 && (
      <Grid.Col span={12}>
        <Stack>
          {title && (
            <Title size={'md'} c={'blue'}>
              Лучшие практики
            </Title>
          )}

          <List p={'none'}>
            {map(bestUseCases, (useCase) => (
              <List.Item c={'dark'} fw={'bold'}>
                {useCase}
              </List.Item>
            ))}
          </List>
        </Stack>
      </Grid.Col>
    )
  );
};
