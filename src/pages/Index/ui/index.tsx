import { initializeChat } from "@entities/chat/lib/initializeChat";
import { AppShellMain, Stack } from "@mantine/core";
import { useAiProviders } from "@shared/api/ai/model/useAiProvidersStore";
import { LogotypeCombined } from "@shared/ui/LogotypeSection";
import { useNavigate } from "@tanstack/react-router";
import { ternary } from "@utils/conditions/ternary";
import { AiInput } from "@widgets/AiInput/ui/AiInput";
import { useResponsive } from "src/hooks/useResponsive";

export const IndexPage = () => {
  const { mobile } = useResponsive();
  const providers = useAiProviders((s) => s.data);
  const navigate = useNavigate();

  return (
    <AppShellMain h={"100dvh"}>
      <Stack justify={ternary(mobile, "end", "center")} h={"100%"}>
        <Stack
          justify={ternary(mobile, "space-between", "center")}
          align="center"
          h={"60%"}
        >
          <LogotypeCombined />

          <AiInput
            onSubmit={async ({ value: { content, provider } }) => {
              const [chatId] = await initializeChat({
                model: provider,
                preview: content,
                content,
                role: "user",
              });

              navigate({
                to: "/chat/$id/$model",
                params: {
                  id: chatId.toString(),
                  model: provider,
                },
              });
            }}
            providers={providers}
          />
        </Stack>
      </Stack>
    </AppShellMain>
  );
};
