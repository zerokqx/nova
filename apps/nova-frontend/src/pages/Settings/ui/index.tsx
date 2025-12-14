import { useApiKeyStore } from '@features/ai-providers/model/useApiKeyStore';
import { useGetSourcesFull } from '@features/sources/api/useGetSourcesFull';
import { AppShellMain, Group } from '@mantine/core';
import { map } from 'lodash';
import { AiCard } from './AiCard/AiCard';

export const SettingsPage = () => {
  const sources = useGetSourcesFull();

  const keys = useApiKeyStore((s) => Object.keys(s.data));
  console.log(sources.data);

  return (
    <AppShellMain h={'100dvh'}>
      {sources.data?.map((s) => (
        <AiCard dbRecordInstance={s} />
      ))}
      {/* <Group align="stretch" grow wrap="wrap"> */}
      {/*   {map(allProviders, (provider) => ( */}
      {/*     <AiCard */}
      {/*       models={provider.models} */}
      {/*       name={provider.providerName} */}
      {/*       available={avalibleProviders.includes(provider.providerName)} */}
      {/*     /> */}
      {/*   ))} */}
      {/* </Group> */}
    </AppShellMain>
  );
};
