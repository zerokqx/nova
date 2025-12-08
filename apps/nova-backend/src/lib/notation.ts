import {
  createNotation,
  type TInferNotation,
  type TInferSep,
} from '@nova/notation';
export const notation = createNotation('/');
export type TNotation = TInferNotation<typeof notation>;
export type TSeparator = TInferSep<typeof notation>;
export type TCreateNotation = typeof notation;
