import type { Grid, GridCol,  } from "@mantine/core";
import type { CompounedComponent } from "@shared/types/functions/fn.type";

export type IContainer = CompounedComponent<
  typeof Grid,
  {
    Item: typeof GridCol;
  }
>;
