import { paths } from '@shared/types/schema';
import { IHeaderAiCard } from './Header.interface';
import { ReactNode } from 'react';
import { IControlsAiCard } from './Controls.interface';
export interface IAiCardProps {
  children?: ReactNode;
  dbRecordInstance: paths['/api/sources/full']['get']['responses']['200']['content']['application/json'][number];
}

export interface IAiCardComponent {
  (props: IAiCardProps): ReactNode;
  Header: IHeaderAiCard;
  Models: () => ReactNode;
  Controls: (props: IControlsAiCard) => ReactNode;
}
