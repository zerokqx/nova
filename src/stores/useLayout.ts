import { createStore } from "@colorfy-software/zfy";
import type { IUseLayoutStore } from "@t/stores/use-layout.type";

export const useLayoutStore = createStore<IUseLayoutStore>("layout-store", {
  aside: false,
  navbar: false,
  drawer: false,
  header: true,
});
