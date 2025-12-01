import { AppShellMain, Stack } from "@mantine/core";
import { transformMetaModelsForSelect } from "@shared/api/ai/lib/formatModel/modelsForSelect";
import { useAiProviders } from "@shared/api/ai/model/useAiProvidersStore";
import { LogotypeCombined } from "@shared/ui/LogotypeSection";
import { ternary } from "@utils/conditions/ternary";
import { AiInput } from "@widgets/AiInput/ui/AiInput";
import { useResponsive } from "src/hooks/useResponsive";

export const IndexPage = () => {
  const { mobile } = useResponsive();
  const providers = useAiProviders((s) => s.data);
  console.log(transformMetaModelsForSelect());
  return (
    <AppShellMain h={"100dvh"}>
      <Stack justify={ternary(mobile, "end", "center")} h={"100%"}>
        <Stack
          justify={ternary(mobile, "space-between", "center")}
          align="center"
          h={"60%"}
        >
          <LogotypeCombined />
          <AiInput providers={providers} />
        </Stack>
      </Stack>
    </AppShellMain>
  );
};
