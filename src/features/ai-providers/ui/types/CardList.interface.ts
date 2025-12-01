import { List, ListItem } from "@mantine/core";
import type { CompounedComponent } from "@shared/types/functions/fn.type";

export type ICardList = CompounedComponent<
  typeof List,
  {
    NormalItem: typeof ListItem;

    ErrorItem: typeof ListItem;
  }
>;
