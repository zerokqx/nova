import { Group } from '@mantine/core';
import { CheckCheck, ListChecks, Trash, Undo2 } from 'lucide-react';
import {
  doAddAllToSelectedItems,
  doClearSelectedItemArray,
  doRemoveLastSelectItem,
  useNavbarStore,
} from './model/navbar-mode-store';
import { AnimatePresence, motion } from 'motion/react';
import { useDeleteManyChat } from '@/features/chats/api/delete-chat';
import { NavbarControlsActon } from './NavbarControlsAction';
import { useQueryClient } from '@tanstack/react-query';
import { components } from '@/shared/types/schema';
import { useMemo } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
const MotionGroup = motion.create(Group);

export const NavbarControls = () => {
  const currentChat = useParams({
    from: '/chat/$id',
    shouldThrow: false,
    select: (p) => p.id,
  });
  const select = useNavbarStore((s) => s.data.sleect);
  const selectedItems = useNavbarStore((s) => s.data.selectedItems);
  const navigate = useNavigate();
  const updateMode = useNavbarStore((s) => s.update);
  const selectedItemsLength = selectedItems.length > 0;
  const { mutateAsync: deleteChats } = useDeleteManyChat();
  const queryClient = useQueryClient();
  const cacheChats = queryClient.getQueryData<
    components['schemas']['ChatEntity'][]
  >(['get', '/api/chats/all', {}]);
  const allIds = useMemo(() => {
    return cacheChats?.map((chat) => chat.id);
  }, [cacheChats]);

  return (
    <Group p={'sm'} bd={'1px dashed dark.9'} bdrs={'xl'}>
      <NavbarControlsActon
        title="Режим выделения"
        color={select ? 'blue.7' : 'dark.9'}
        onClick={() => updateMode((s) => (s.sleect = !select))}
      >
        <CheckCheck size={16} />
      </NavbarControlsActon>
      <AnimatePresence>
        {select && (
          <NavbarControlsActon
            onClick={() => {
              if (allIds) {
                doAddAllToSelectedItems(allIds);
              }
            }}
          >
            <ListChecks size={16} />
          </NavbarControlsActon>
        )}
        {select && selectedItemsLength && (
          <MotionGroup
            key={'controls-group'}
            wrap="nowrap"
            style={{ originX: 0 }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0, opacity: 0 }}
            transition={{
              duration: 0.2,
              type: 'spring',
              stiffness: 400,
            }}
          >
            <NavbarControlsActon
              key={'undo'}
              onClick={doRemoveLastSelectItem}
              title="Убрать выделение с последнего элемента"
            >
              <Undo2 size={16} />
            </NavbarControlsActon>

            <NavbarControlsActon
              key={'unchecked'}
              color="red.9"
              onClick={doClearSelectedItemArray}
              title="Снять выделение со всех"
            >
              <CheckCheck size={16} />
            </NavbarControlsActon>
            <NavbarControlsActon
              key={'delete'}
              onClick={async () => {
                if (currentChat)
                  selectedItems.includes(currentChat) && navigate({ to: '/' });

                await deleteChats(
                  {
                    body: {
                      ids: selectedItems,
                    },
                  },
                  {
                    onSuccess() {
                      doClearSelectedItemArray();
                    },
                  }
                );
              }}
              title="Удалить выделеные"
              color="red.9"
            >
              <Trash size={16} />
            </NavbarControlsActon>
          </MotionGroup>
        )}
      </AnimatePresence>
    </Group>
  );
};
