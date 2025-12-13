export const Errors = {
  WITOUT_CLIENT:
    'The call was made without calling the with() function. this.client is empty. Call with(...).send(...)',
  WITHOUT_API_KEY: 'The Api key was not passed to the body.',
  IS_NOT_AI_PROVIDER:
    "Guard was called on a handler that is not the provider's handler. If this is not the case, use the decorator `@AiProvider`",
  NOT_PROVIDER_NAME:
    "The necessary metadata for guard's operation was not found on the handler function. Not enough - ProviderName",
} as const;
