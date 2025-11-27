import { Providers } from "@ai/providers";
import { AiCard } from "@components/AiCard";
import { AppShellMain, Group } from "@mantine/core";
import { useAiProviders } from "src/stores/useAiProviders";

export const SettingsPage = () => {
  const allProvidersKey = Providers.getNames();
  const avalibleProviders = useAiProviders((s) => s.data);
  console.log(avalibleProviders);
  return (
    <AppShellMain h={"100dvh"}>
      <Group align="start">
        {allProvidersKey.map((p) => (
          <AiCard name={p} available={avalibleProviders.includes(p)} />
        ))}
      </Group>
    </AppShellMain>
  );
};
