import { useApiKeyStore } from "@features/ai-providers/model/useApiKeyStore";
import { AiCard } from "@features/ai-providers/ui/AiCard";
import { AppShellMain, Group } from "@mantine/core";
import { MetaController } from "@shared/api/ai";
import { getAllow } from "@shared/api/ai/utils/meta/getAllow";
import { map } from "lodash";

export const SettingsPage = () => {
  const keys = useApiKeyStore((s) => Object.keys(s.data));
  const allProviders = MetaController.getAll();
  const avalibleProviders = getAllow(keys).map((s) => s.providerName);

  return (
    <AppShellMain h={"100dvh"}>
      <Group align="stretch" grow wrap="wrap">
        {map(allProviders, (provider) => (
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
