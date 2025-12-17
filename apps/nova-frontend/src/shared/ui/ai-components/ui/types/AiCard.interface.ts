import { components } from '@shared/types/schema';
import { IHeaderAiCard } from './Header.interface';
import { ReactNode } from 'react';
import { IControlsComponent } from './Controls.interface';
import { IList } from './Lists.interface';
export interface IAiCardProps {
  children?: ReactNode;
  sources: components['schemas']['SourceFullEntity'];
}

export interface IAiCardComponent {
  (props: IAiCardProps): ReactNode;
  Header: IHeaderAiCard;
  Models: () => ReactNode;
  Controls: IControlsComponent;
  Remarks: (props: IList) => ReactNode;
  BestUseCases: (props: IList) => ReactNode;
}
