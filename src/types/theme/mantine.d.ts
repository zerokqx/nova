import "@mantine/core";
import type { DefaultMantineColor, DefaultMantineSize } from "@mantine/core";

type ExtendedCustomSpacing = "none" | DefaultMantineSize;
type ExtendedCustomColors = "trueBlack" | "sky" | DefaultMantineColor;
type ExtendedCustomRadius = "none" | DefaultMantineSize;
declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>;
  }
  export interface MantineThemeSizesOverride {
    spacing: Record<ExtendedCustomSpacing, string>;
    radius: Record<ExtendedCustomRadius, string>;
  }
}
