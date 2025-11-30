import { transformMetaModelsForSelect } from "@ai/utils/transformModelsForSelect";
import { InputWithControls } from "@components/CombinedInputIcon";
import { useResponsive } from "@hooks/useResponsive";
import { AppShellMain, Stack } from "@mantine/core";
import { ternary } from "@utils/conditions/ternary";
import { LogotypeCombined } from "src/shared/ui/LogotypeSection/LogotypeCombined";
import { useAiProviders } from "src/stores/useAiProviders";

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
          <InputWithControls providers={providers} />
        </Stack>
      </Stack>
    </AppShellMain>
  );
};
