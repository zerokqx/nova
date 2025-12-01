import { Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { aiProvidersAction } from "@shared/api/ai/model/useAiProvidersStore";
import { map } from "lodash";
import type { TModels } from "@shared/api/ai/aiAbstract/types/models.type";
import type { TSources } from "@shared/api/ai/types/sources.type";
import { lazy, Suspense } from "react";
import { Container } from "./AiCard/Container";
import { Remove } from "./AiCard/Remove";
import { CardTitle } from "./AiCard/Title";
import { CardList } from "./AiCard/StatusList";
import { Model } from "./AiCard/Model";
import { CreateApiKeyButton } from "./AiCard/CreateApiKeyButton";
import { PuthcApiKeyButton } from "./AiCard/PuthcApiKeyButton";

import style from "@shared/styles/effects/Scale.module.css";
const LazyAddModal = lazy(() =>
  import(".").then((m) => ({ default: m.ModalApiAddKeyForm })),
);

const LazyPutchModal = lazy(() =>
  import("./PutchApiKeyModal.tsx").then((m) => ({
    default: m.PutchApiKeyModal,
  })),
);
export const AiCard = ({
  name,
  available,
  models,
}: {
  name: TSources;
  available: boolean;
  models: TModels;
}) => {
  const [openedAdd, { toggle: toggleAdd }] = useDisclosure(false);

  const [openedPutch, { toggle: togglePutch }] = useDisclosure(false);
  return (
    <Container maw={"30rem"} className={style.main}>
      <Container.Item span={"auto"}>
        <CardTitle>{name}</CardTitle>
      </Container.Item>
      <Container.Item>
        <Group>
          {map(models, (model) => (
            <Model name={model} />
          ))}
        </Group>
      </Container.Item>

      <Container.Item span={12}>
        <CardList p={"none"}>
          {available ? (
            <CardList.NormalItem>Доступно</CardList.NormalItem>
          ) : (
            <CardList.ErrorItem>
              Не доступно, создайте API ключ
            </CardList.ErrorItem>
          )}
        </CardList>
      </Container.Item>
      <Suspense fallback={null}>
        <LazyPutchModal
          onClose={togglePutch}
          name={name}
          opened={openedPutch}
        />
        <LazyAddModal
          providerName={name}
          title={`Ключ ${name}`}
          opened={openedAdd}
          onClose={toggleAdd}
        />
      </Suspense>

      <Container.Item>
        <Group justify="end" align="end">
          {!available ? (
            <Group justify="end">
              <CreateApiKeyButton onClick={toggleAdd} />
            </Group>
          ) : (
            <>
              <Remove onClick={() => aiProvidersAction.doRemove(name)} />
              <PuthcApiKeyButton onClick={togglePutch} />
            </>
          )}
        </Group>
      </Container.Item>
    </Container>
  );
};
