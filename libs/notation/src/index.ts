export { createStringNotation } from './lib/create-string-notation.js';
export { createNotation } from './lib/create-notation.js';
export { parseNotation } from './lib/parse-notation.js';
export { parseSeparator } from './lib/parse-separator.js';
export type { TCreateNotation } from './lib/types/create-notation.type.ts';
export type { TParseNotationFn } from './lib/types/parse-notation.type.ts';
export type { TParseSeparatorFn } from './lib/types/parse-separator.type.ts';
export type {
  TBeforeSplit,
  TSlashNotation,
} from './lib/types/slash-notation.type.ts';
export type { TCreateStringNotationFn } from './lib/types/create-string-notation.type.ts';

export type {
  TInferSep,
  TInfer,
  TInferNotation,
} from './lib/types/infer-notation.type.ts';
