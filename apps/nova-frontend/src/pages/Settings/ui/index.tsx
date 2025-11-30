import { getAllMeta } from "@ai/utils/providerUtils";
import { AiCard } from "@components/AiCard";
import { AppShellMain, Group } from "@mantine/core";
import { map } from "lodash";
import { useAiProviders } from "src/stores/useAiProviders";

export const SettingsPage = () => {
  const allProvidersKey = getAllMeta();
  console.log(allProvidersKey);
  const avalibleProviders = useAiProviders((s) => s.data);
  return (
    <AppShellMain h={"100dvh"}>
      <Group align="start" grow wrap="wrap">
        {map(allProvidersKey, (provider) => (
          <AiCard
            models={provider.models}
            name={provider.providerName}
            available={avalibleProviders.includes(provider.providerName)}
          />
        ))}
      </Group>
    </AppShellMain>
  );
};
