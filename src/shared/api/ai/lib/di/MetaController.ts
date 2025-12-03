import { providers } from "../../container";
import { metaKey } from "../../utils/meta/metaKey";
import { withoutMetaSuffix } from "../../utils/meta/withOutMetaSuffix";
import { AI, AIMETA } from "../symbols/symbols";
import type { TGetAllMetaFn } from "./types/getAllMeta.type";
import type { TGetByMetaNameFn } from "./types/getByMetaName.type";
import type { TGetMetaWithSource } from "./types/getMetaWithSource.type";
import type { IMetaController } from "./types/MetaController.interface";

/**
 * Класс-агрегатор для работы с мета-данными и провайдерами.
 * Предоставляет методы для получения всех мета-данных, поиска по имени мета-данных
 * и получения мета-данных вместе с источником.
 *
 * @class __MetaController
 * @implements {IMetaController}
 */
export class __MetaController implements IMetaController {
  /**
   * Возвращает массив всех мета-данных, зарегистрированных в провайдерах.
   *
   */
  getAll: TGetAllMetaFn = () => {
    return Object.values(AIMETA).map((symbol) => providers.get(symbol));
  };

  /**
   * Возвращает мета-данные по имени мета-данных.
   *
   * @param  metaName - Имя мета-данных (без суффикса).
   * @returns  Мета-данные, соответствующие имени.
   */
  getByMetaName: TGetByMetaNameFn = (metaName) => {
    return providers.get(AI[withoutMetaSuffix(metaName)]);
  };

  /**
   * Возвращает мета-данные и источник по ключу.
   *
   * @param  key - Ключ для поиска мета-данных и источника.
   * @returns  Объект с источником и мета-данными.
   */
  getMetaWithSource: TGetMetaWithSource = (key) => {
    const symbolSource = AI[key];
    const symbolMeta = AIMETA[metaKey(key)];
    return {
      source: providers.get(symbolSource),
      meta: providers.get(symbolMeta),
    };
  };
}
