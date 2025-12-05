import type { TNameSlashNotationFn } from "./types/nameSlashNotation.type";

/**
 * @description Функция для форматирования имени источник+модель через `:` разделитель
 */
export const nameSlashNotation: TNameSlashNotationFn = (source, model) =>
  `${source}/${model}`;
