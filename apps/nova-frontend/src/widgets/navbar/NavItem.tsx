import { Checkbox, Group, rem, Text, useMantineTheme } from '@mantine/core';
import { Link } from '@tanstack/react-router';
import { useLayoutStore } from '@shared/lib/stores/useLayout';
import { components } from '@/shared/types/schema';
import {
  doNewSelectItem,
  doRemoveSelectItem,
  useNavbarStore,
} from './model/navbar-mode-store';
import { AnimatePresence, motion } from 'motion/react';

export const NavItem = ({
  text,
  id,
}: {
  text: string;
  id: components['schemas']['ChatEntity']['id'];
}) => {
  const t = useMantineTheme();
  const select = useNavbarStore((s) => s.data.sleect);
  const isChecked = useNavbarStore((s) => s.data.selectedItems.includes(id));
  const updateLayout = useLayoutStore((s) => s.update);

  return (
    <Link
      to="/chat/$id"
      params={{
        id: id,
      }}
      disabled={select}
      style={{
        borderRadius: t.radius.md,
        textDecoration: 'none',
      }}
      onClick={() => {
        !select &&
          updateLayout((s) => {
            s.aside = false;
            s.navbar = false;
          });
      }}
      className="hover:bg-[#ffffff10]"
      activeProps={{
        style: { border: `${t.colors.dark[9]} solid ${rem(1)}` },
      }}
    >
      <Group bdrs={'inherit'} w={'100%'} gap={'none'} p={'md'} wrap="nowrap">
        <AnimatePresence>
          {select && (
            <motion.div
              initial={{
                scale: 0,
                opacity: 0,
                width: '0',
                marginRight: t.spacing.md,
              }}
              key={'select'}
              exit={{
                scale: 0,
                opacity: 0,
                width: '0',
                marginRight: 0,
              }}
              whileHover={{
                scale: 1.1,
              }}
              whileTap={{
                scale: [2, 1],
              }}
              whileInView={{
                scale: 1,
                opacity: 1,
                width: 'auto',
              }}
            >
              <Checkbox
                checked={isChecked}
                onChange={(e) => {
                  if (e.currentTarget.checked) doNewSelectItem(id);
                  else doRemoveSelectItem(id);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <Text w={'100%'} truncate="end">
          {text}
        </Text>
      </Group>
    </Link>
  );
};
