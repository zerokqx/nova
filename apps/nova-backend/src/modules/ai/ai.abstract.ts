import { Errors } from './ai.constants';
import { AssistantModelMessage, StreamTextResult, ToolSet } from 'ai';
/**
 * Базовый абстрактный провайдер для AI‑клиентов.
 *
 * Идея:
 * - Класс инкапсулирует логику работы с конкретным SDK (Perplexity, Gemini и т.д.).
 * - Жизненный цикл: with(apiKey) → send(prompt, model).
 * - Дочерние классы реализуют создание клиента и саму отправку запросов.
 *
 * @typeParam T Тип клиента SDK (например, PerplexityProvider, GeminiProvider).
 */
export abstract class AiProvider<T> {
  /**
   * Инстанс конкретного клиента SDK.
   * Инициализируется лениво в with(), через _createClient().
   */
  protected client!: T;

  /**
   * Текущий API‑ключ, с которым был сконфигурирован провайдер.
   */
  protected _api!: string;

  /**
   * Отправка запроса в модель.
   *
   * Контракт для наследников:
   * - Должен использовать client (через sendGuard()) и переданный model.
   * - Возвращает нормализованное сообщение ассистента.
   *
   * @param prompt Текст запроса пользователя.
   * @param model Идентификатор модели (например, 'sonar', 'gemini-2.5-flash').
   */
  abstract send(prompt: string, model: string): Promise<AssistantModelMessage>;

  /**
   * Внутренняя установка API‑ключа.
   * Не создаёт клиента, только сохраняет ключ.
   *
   * Используется в with(), можно вызывать/расширять в наследниках.
   *
   * @param apiKey API‑ключ провайдера.
   */
  protected _with(apiKey: string) {
    this._api = apiKey;
    return this;
  }

  /**
   * Фабрика клиента SDK.
   *
   * Дочерний класс обязан реализовать создание конкретного клиента
   * (например, createPerplexity({ apiKey }) / createGemini({ apiKey })).
   *
   * @param args Обычно API‑ключ или объект с конфигом.
   * @returns Инстанс SDK‑клиента.
   */
  protected abstract _createClient(args: any): T;

  /**
   * Гвард для send(): проверяет, что провайдер корректно сконфигурирован.
   *
   * Логика:
   * - Если нет ни API‑ключа, ни клиента — кидает ошибку Errors.WITOUT_CLIENT.
   * - Иначе возвращает текущий client.
   *
   * Рекомендуется вызывать в начале send():
   *   const client = this.sendGuard();
   */
  protected sendGuard(): T {
    if (!this._api && !this.client) {
      throw new Error(Errors.WITOUT_CLIENT);
    }
    return this.client;
  }

  /**
   * Гвард для lazy‑инициализации клиента.
   *
   * Логика:
   * - Если client ещё не создан — вызывает guard(), который должен его создать.
   * - Всегда возвращает актуальный client.
   *
   * Используется в with():
   *   this.clientGuard(() => { this.client = this._createClient(apiKey); });
   *
   * @param guard Функция, создающая client (обычно присваивает this.client).
   */
  protected clientGuard(guard: () => void): T {
    if (!this.client) {
      guard();
    }
    return this.client;
  }

  /**
   * Публичный Fluent‑метод конфигурации провайдера.
   *
   * Жизненный цикл:
   * - Сохраняет API‑ключ (_with(apiKey)).
   * - Гарантирует, что client инициализирован (через clientGuard()).
   * - Возвращает this для цепочек: provider.with(key).send(prompt, model).
   *
   * При необходимости может быть переопределён в наследниках
   * (например, для кэширования клиентов по ключам).
   *
   * @param apiKey API‑ключ, с которым должен работать провайдер.
   * @returns this для Fluent API.
   */
  with(apiKey: string): this {
    this._with(apiKey);
    this.client = this._createClient(apiKey);
    return this;
  }

  abstract stream(
    prompt: string,
    model: string
  ): StreamTextResult<ToolSet, never>;
}
