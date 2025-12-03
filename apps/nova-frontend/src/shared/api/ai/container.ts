import { TypedContainer, type TypedInject } from "@inversifyjs/strongly-typed";
import { Container, decorate, inject } from "inversify";
import { AiSourcePerplexity } from "./providers/Perplexity";
import type { TBindingMap } from "./types/bindingsMap.type";
import { Meta } from "./utils/meta/Meta";
import { AIMETA, AI } from "./lib/symbols/symbols";
import { AiSourceGemini } from "./providers/Gemini";
export const $inject = inject as TypedInject<TBindingMap>;

export const providers = new Container() as TypedContainer<TBindingMap>;
decorate(inject(AIMETA.GeminiMeta), AiSourceGemini, 0);
decorate(inject(AIMETA.PerplexityMeta), AiSourcePerplexity, 0);
providers.bind(AIMETA.GeminiMeta).toConstantValue(
  new Meta({
    models: ["gemini-2.5-flash", "gemini-2.5-pro", "gemini-flash-lite"],
    providerName: "Gemini",
    thinking: true,
    defaultModel: "gemini-2.5-flash",
  }),
);
providers.bind(AIMETA.PerplexityMeta).toConstantValue(
  new Meta({
    models: ["sonar"],
    providerName: "Perplexity",
    thinking: true,
    defaultModel: "sonar",
  }),
);
providers.bind(AI.Perplexity).to(AiSourcePerplexity).inSingletonScope();
providers.bind(AI.Gemini).to(AiSourceGemini).inSingletonScope();
console.log(providers.get(AIMETA.GeminiMeta).slashNotation);
