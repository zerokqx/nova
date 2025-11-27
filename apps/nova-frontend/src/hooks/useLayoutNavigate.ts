import { useNavigate, type NavigateOptions } from "@tanstack/react-router";
import { useLayoutStore } from "src/stores/useLayout";

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
