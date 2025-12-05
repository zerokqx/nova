import { ReactComponent as NovaText } from '@shared/assets/Nova.svg';
import type { ILogotypeText } from '../types/LogotypeProps.type';
export const LogotypeText = ({ width = 128 }: ILogotypeText) => {
  return <NovaText height={'max-content'} width={width} />;
};
