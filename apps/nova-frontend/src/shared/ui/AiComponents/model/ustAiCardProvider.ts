import { createContext, use } from 'react';
import { IAiCardProps } from '../ui/types/AiCard.interface';

export const AiCardProvider = createContext<
  (IAiCardProps['dbRecordInstance'] & { available: boolean }) | null
>(null);

export const useAiCard = () => {
  const context = use(AiCardProvider);
  if (!context) throw new Error('Call not in provider');
  return context;
};
