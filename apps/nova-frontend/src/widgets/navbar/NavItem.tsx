import {
  Button,
  Group,
  Portal,
  rem,
  Text,
  useMantineTheme,
} from '@mantine/core';
import stl from './styles/nav-item-hove.module.css';
import type { TModels } from '@shared/api/ai/aiAbstract/types/models.type';
import { Link, useNavigate, useParams } from '@tanstack/react-router';
import { useLayoutStore } from '@shared/lib/stores/useLayout';
import { deSlashNotation } from '@shared/api/ai/lib/formatModel/nameModelFormat';
import type { TAiUrl } from '@shared/api/ai/lib/formatModel/types/metaSourceAndModel.type';
import { components } from '@/shared/types/schema';
import { doSelect } from '@/features/chats/model/select-chat.store';

export const NavItem = ({
  text,
  id,
}: {
  text: string;
  id: components['schemas']['ChatEntity']['id'];
}) => {
  const t = useMantineTheme();
  const updateLayout = useLayoutStore((s) => s.update);

  return (
    <Link
      to="/chat/$id"
      params={{
        id: id.toString(),
      }}
      style={{ borderRadius: t.radius.md, textDecoration: 'none' }}
      onClick={() => {
        updateLayout((s) => {
          s.aside = false;
          s.navbar = false;
        });
        doSelect(id);
      }}
      activeProps={{
        style: { border: `${t.colors.dark[9]} solid ${rem(1)}` },
      }}
    >
      <Group
        bdrs={'inherit'}
        className={stl.effect}
        w={'100%'}
        p={'md'}
        wrap="nowrap"
      >
        <Text w={'100%'} c={'white'} truncate="end">
          {text}
        </Text>
      </Group>
    </Link>
  );
};
