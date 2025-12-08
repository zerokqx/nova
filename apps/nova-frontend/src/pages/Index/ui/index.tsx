import { initializeChat } from '@entities/chat/lib/initializeChat';
import { apiKeyStoreActions } from '@features/ai-providers/model/useApiKeyStore';
import { AppShellMain, Stack } from '@mantine/core';
import { deSlashNotation } from '@shared/api/ai/lib/formatModel/nameModelFormat';
import type { TAiUrl } from '@shared/api/ai/lib/formatModel/types/metaSourceAndModel.type';
import type { ITransformModel } from '@shared/api/ai/lib/formatModel/types/transform.type';
import { getAllow } from '@shared/api/ai/utils/meta/getAllow';
import { mergeArraySlashNotation } from '@shared/api/ai/utils/meta/mergeArraySlashNotation';
import { useResponsive } from '@shared/lib/hooks/useResponsive';
import { LogotypeCombined } from '@shared/ui/LogotypeSection';
import { useNavigate } from '@tanstack/react-router';
import { ternary } from '@utils/conditions/ternary';
import { AiInput } from '@widgets/AiInput/ui/AiInput';
import { flatMap, flatten, forEach, map, merge } from 'lodash';
import { useEffect } from 'react';
import axios from 'axios';

export const IndexPage = () => {
  const { mobile } = useResponsive();
  const allows = getAllow(apiKeyStoreActions.doKeys());
  const providers = mergeArraySlashNotation(
    map(allows, (meta) => {
      return meta.slash;
    }) as ITransformModel[]
  );
  useEffect(() => {
    const data = axios
      .get('http://localhost:3000/api/sources/full')
      .then((s) => {
        console.log(s.data);
      });
  }, []);
  const navigate = useNavigate();
  return (
    <AppShellMain h={'100dvh'}>
      <Stack justify={ternary(mobile, 'end', 'center')} h={'100%'}>
        <Stack
          justify={ternary(mobile, 'space-between', 'center')}
          align="center"
          h={'60%'}
        >
          <LogotypeCombined />
          <AiInput
            onSubmit={async ({ value: { content, provider } }) => {
              const { model, source } = deSlashNotation(provider as TAiUrl);
              const [chatId] = await initializeChat({
                url: provider as TAiUrl,
                preview: content,
                content,
                role: 'user',
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
