import { Grid, GridCol, rem } from "@mantine/core";
import type { IContainer } from "../types/Container.interface";

const __Container = Grid.withProps({
  bdrs: "sm",
  p: "md",
  style: (t) => ({ border: `${t.colors.dark[9]} ${rem(1)} solid` }),
});

export const Container = Object.assign(__Container, {
  Item: GridCol,
}) as IContainer;
