import { createNotation, TInferNotation } from '@nova/notation';
export const notation = createNotation('/');
export type TNotation = TInferNotation<typeof notation>;
