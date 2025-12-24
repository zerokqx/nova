import { Grid } from '@mantine/core';
import { IAiCardComponent, IAiCardProps } from '../types/AiCard.interface';
import { motion, spring } from 'motion/react';
import { AiCardProvider } from '../../model/ustAiCardProvider';
import { Header } from './header/Header';
import { Controls } from './controls/Controls';
import { Models } from './models/Models';
import { Remarks } from './lists/Remarks';
import { BestUseCases } from './lists/BestUseCases';

const MotionGrid = motion.create(Grid);
export const AiCard: IAiCardComponent = ({ sources, children }: IAiCardProps) => {
  const available = sources.key?.apiKey.length > 0;
  return (
    <AiCardProvider value={{ ...sources, available }}>
      <MotionGrid
        layout
        bd={`1px solid dark.9`}
        p={'md'}
        bdrs={'sm'}
        miw={'min(95%,25rem)'}
        bg={'black'}
        flex={'1'}
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
AiCard.Remarks = Remarks;
AiCard.BestUseCases = BestUseCases;
