import { useMantineTheme } from '@mantine/core';
import { Aside as AsideComponent } from './AsideRoot';
import { BrainCog, CircleQuestionMark } from 'lucide-react';
import { useLayoutNavigate } from '@shared/lib/hooks/useLayoutNavigate';

export const Aside = () => {
  const blue = useMantineTheme().colors.blue[8];
  const navigate = useLayoutNavigate();

  return (
    <AsideComponent withBorder>
      <AsideComponent.Action
        label="Провайдеры"
        icon={<BrainCog color={blue} />}
        onClick={() => navigate({ to: '/settings' })}
      />

      <AsideComponent.Action
        label="О приложении"
        icon={<CircleQuestionMark color={blue} />}
        onClick={() => navigate('/settings/about')}
      />
    </AsideComponent>
  );
};
