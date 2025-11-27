import { InputWithControls } from "@components/CombinedInputIcon";
import { LogotypeCombined } from "@components/LogotypeSection/LogotypeCombined";
import { useResponsive } from "@hooks/useResponsive";
import { AppShellMain, Button, Stack } from "@mantine/core";
import { ternary } from "@utils/conditions/ternary";
import { useEffect } from "react";
import { apiKeyStoreActions, useApiKeyStore } from "src/stores/useApiKeyStore";

export const IndexPage = () => {
  const { mobile } = useResponsive();
  return (
    <AppShellMain h={"100dvh"}>
      <Stack justify={ternary(mobile, "end", "center")} h={"100%"}>
        <Stack
          justify={ternary(mobile, "space-between", "center")}
          align="center"
          h={"60%"}
        >
          <LogotypeCombined />
          <InputWithControls />
        </Stack>
      </Stack>
    </AppShellMain>
  );
};
