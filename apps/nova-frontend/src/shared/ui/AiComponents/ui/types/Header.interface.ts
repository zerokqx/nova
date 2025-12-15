import { type ReactNode } from 'react';

export interface IHeaderProps {
  children: ReactNode;
}
export interface IHeaderIconProps {
  size?: number;
}

export interface IHeaderAiCard {
  (props: IHeaderProps): ReactNode;
  Title: () => ReactNode;
  Icon: (props: IHeaderIconProps) => ReactNode;
}
