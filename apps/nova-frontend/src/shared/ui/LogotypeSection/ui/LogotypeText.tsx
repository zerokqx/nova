import NovaText from '@shared/assets/Nova.svg?react';
import type { ILogotypeText } from '../types/LogotypeProps.type';
export const LogotypeText = ({ width = 128 }: ILogotypeText) => {
  return <NovaText height={'max-content'} width={width} />;
};
