import { Grid } from '@mantine/core';
import { IAiCardComponent, IAiCardProps } from '../types/AiCard.interface';
import { motion } from 'motion/react';
import { AiCardProvider } from '../../model/ustAiCardProvider';
import { Header } from './Header/Header';
import { Controls } from './Controls/Controls';
import { Models } from './Models/Models';

const MotionGrid = motion.create(Grid);
export const AiCard: IAiCardComponent = ({
  dbRecordInstance,
  children,
}: IAiCardProps) => {
  const available = dbRecordInstance.key?.apiKey.length > 0;
  return (
    <AiCardProvider value={{ ...dbRecordInstance, available }}>
      <MotionGrid
        bd={`1px solid dark.9`}
        p={'md'}
        bdrs={'sm'}
        w={'min(25rem, 95%)'}
        bg={'black'}
        whileHover={{
          scale: 1.05,
          rotate: '0.5deg',
        }}
      >
        {children}
      </MotionGrid>
    </AiCardProvider>
  );
};

AiCard.Header = Header;
AiCard.Controls = Controls;
AiCard.Models = Models;
