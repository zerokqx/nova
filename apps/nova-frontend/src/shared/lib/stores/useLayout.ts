import { createStore } from "@colorfy-software/zfy";
import type { IUseLayoutStore } from "./types/useLayout.interface";

export const useLayoutStore = createStore<IUseLayoutStore>("layout-store", {
  aside: false,
  navbar: false,
  drawer: false,
  header: true,
});
