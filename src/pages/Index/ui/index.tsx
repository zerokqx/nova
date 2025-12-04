import { initializeChat } from "@entities/chat/lib/initializeChat";
import { apiKeyStoreActions } from "@features/ai-providers/model/useApiKeyStore";
import { AppShellMain, Stack } from "@mantine/core";
import { deSlashNotation } from "@shared/api/ai/lib/formatModel/nameModelFormat";
import type { TAiUrl } from "@shared/api/ai/lib/formatModel/types/metaSourceAndModel.type";
import type { ITransformModel } from "@shared/api/ai/lib/formatModel/types/transform.type";
import { getAllow } from "@shared/api/ai/utils/meta/getAllow";
import { mergeArraySlashNotation } from "@shared/api/ai/utils/meta/mergeArraySlashNotation";
import { LogotypeCombined } from "@shared/ui/LogotypeSection";
import { useNavigate } from "@tanstack/react-router";
import { ternary } from "@utils/conditions/ternary";
import { AiInput } from "@widgets/AiInput/ui/AiInput";
import { flatMap, flatten, forEach, map, merge } from "lodash";
import { useResponsive } from "src/hooks/useResponsive";

export const IndexPage = () => {
  const { mobile } = useResponsive();
  const providers = mergeArraySlashNotation(
    map(getAllow(apiKeyStoreActions.doKeys()), (meta) => {
      return meta.slash;
    }),
  );
  const navigate = useNavigate();

  return (
    <AppShellMain h={"100dvh"}>
      <Stack justify={ternary(mobile, "end", "center")} h={"100%"}>
        <Stack
          justify={ternary(mobile, "space-between", "center")}
          align="center"
          h={"60%"}
        >
          {" "}
          <LogotypeCombined />
          <AiInput
            onSubmit={async ({ value: { content, provider } }) => {
              const { model, source } = deSlashNotation(provider as TAiUrl);
              console.trace(provider);
              const [chatId] = await initializeChat({
                url: provider as TAiUrl,
                preview: content,
                content,
                role: "user",
              });

              navigate({
                to: `/chat/$id/${provider}`,
                params: {
                  provider: source,
                  id: chatId.toString(),
                  model,
                },
              });
            }}
            providers={providers.forSelect}
          />
        </Stack>
      </Stack>
    </AppShellMain>
  );
};
