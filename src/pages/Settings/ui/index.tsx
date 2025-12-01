import { AiCard } from "@features/ai-providers/ui/AiCard";
import { AppShellMain, Group } from "@mantine/core";
import { getAllMeta } from "@shared/api/ai/lib/di/getAllMeta";
import { useAiProviders } from "@shared/api/ai/model/useAiProvidersStore";
import { map } from "lodash";

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
