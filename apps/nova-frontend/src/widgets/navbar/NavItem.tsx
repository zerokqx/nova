import { Group, rem, Text, useMantineTheme } from '@mantine/core';
import stl from './styles/nav-item-hove.module.css';
import { Link } from '@tanstack/react-router';
import { useLayoutStore } from '@shared/lib/stores/useLayout';
import { components } from '@/shared/types/schema';
import { hover } from '@/shared/styles/effects/sx/hover';

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
        id: id,
      }}
      style={{ borderRadius: t.radius.md, textDecoration: 'none' }}
      onClick={() => {
        updateLayout((s) => {
          s.aside = false;
          s.navbar = false;
        });
      }}
      activeProps={{
        style: { border: `${t.colors.dark[9]} solid ${rem(1)}` },
      }}
    >
      <Group
        bdrs={'inherit'}
        sx={{ ...hover }}
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
