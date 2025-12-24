import { Grid, List, Stack, Title } from '@mantine/core';
import { useAiCard } from '../../../model/ustAiCardProvider';
import { map } from 'lodash';
import { IAiCardComponent } from '../../types/AiCard.interface';

export const Remarks: IAiCardComponent['Remarks'] = ({ title }) => {
  const { remarks } = useAiCard();
  return (
    remarks.length > 0 && (
      <Grid.Col span={12}>
        <Stack>
          {title && (
            <Title size={'md'} c={'blue'}>
              Примечания
            </Title>
          )}
          <List p={'none'}>
            {map(remarks, (remark) => (
              <List.Item c={'yellow'}>{remark}</List.Item>
            ))}
          </List>
        </Stack>
      </Grid.Col>
    )
  );
};
