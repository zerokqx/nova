import {
  createNotation,
  type TInferNotation,
  type TInferSep,
} from '@nova/slash';
export const notation = createNotation('/');
export type TNotation = TInferNotation<typeof notation>;
export type TSeparator = TInferSep<typeof notation>;
