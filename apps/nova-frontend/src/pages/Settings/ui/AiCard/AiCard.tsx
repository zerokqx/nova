import {
  Badge,
  Box,
  Button,
  Divider,
  Grid,
  Group,
  Image,
  Space,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IAiCardProps } from '../types/AiCard.interface';
import { capitalize, map, upperCase } from 'lodash';
import scale from '@shared/styles/effects/Scale.module.css';
import { motion } from 'motion/react';

const MotionGrid = motion.create(Grid);
export const AiCard = ({
  dbRecordInstance: { iconUrl, name, byCreated, color, models, key },
}: IAiCardProps) => {
  const avalible = key?.apiKey.length > 0;
  return (
    <MotionGrid
      bd={`1px solid dark.9`}
      p={'md'}
      bdrs={'sm'}
      maw={'30rem'}
      miw={'20rem'}
      bg={'black'}
      whileHover={{
        scale: 1.05,
        rotate: '0.5deg',
      }}
    >
      <Grid.Col span={12}>
        <Group justify="space-between">
          <Group>
            <Image w={32} h={32} src={iconUrl} />
            <Title c={'blue'}>{capitalize(name)}</Title>
          </Group>
          <Text>{byCreated}</Text>
        </Group>
      </Grid.Col>
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

      <Grid.Col span={12}>
        {avalible ? (
          <Text c={'blue'} fw={600}>
            Провайдер готов к использованиею.
          </Text>
        ) : (
          <Stack>
            <Text c={'yellow'}>Недоступно</Text>
            <Button>Создать API ключ</Button>
          </Stack>
        )}
      </Grid.Col>
    </MotionGrid>
  );
};
