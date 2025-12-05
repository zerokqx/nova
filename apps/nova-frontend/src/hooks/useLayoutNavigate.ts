import { useLayoutStore } from "@shared/lib/stores/useLayout";
import { useNavigate, type NavigateOptions } from "@tanstack/react-router";

export const useLayoutNavigate = () => {
  const navigate = useNavigate();
  const update = useLayoutStore((s) => s.update);

  return (options: NavigateOptions) => {
    update((s) => {
      s.navbar = false;
      s.aside = false;
    });
    navigate(options);
  };
};
