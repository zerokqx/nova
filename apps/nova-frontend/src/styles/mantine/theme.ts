import { createTheme, Modal, Textarea, TextInput } from "@mantine/core";
export const mantineTheme = createTheme({
  colors: {
    fiolet: [
      "#f4e9ff",
      "#e2cfff",
      "#c09bff",
      "#9d64ff",
      "#7f36fe",
      "#6d19fe",
      "#5c00fc",
      "#5200e4",
      "#4800cc",
      "#3d00b4",
    ],
    blue: [
      "#e6f2ff",
      "#cddfff",
      "#9bbdff",
      "#6498ff",
      "#3879fe",
      "#1c65fe",
      "#0055ff",
      "#004ce4",
      "#0043cd",
      "#0039b5",
    ],
    sky: [
      "#e0faff",
      "#cbf0ff",
      "#99deff",
      "#64cbff",
      "#3bbcfe",
      "#22b2fe",
      "#00a8fc",
      "#0097e4",
      "#0087cd",
      "#0075b6",
    ],
    trueBlack: [
      "#f5f5f5",
      "#e7e7e7",
      "#cdcdcd",
      "#b2b2b2",
      "#9a9a9a",
      "#8b8b8b",
      "#848484",
      "#717171",
      "#656565",
      "#000000",
    ],
  },
  white: "#FFFFFF",

  black: "#040404",
  fontSmoothing: true,
  primaryShade: { light: 7, dark: 5 },
  autoContrast: true,
  primaryColor: "blue",
  fontFamily: "Roboto",
  headings: {
    textWrap: "balance",
  },
  spacing: {
    none: "0px",
    xs: "4px",
    sm: "8px",

    md: "16px",
    lg: "32px",
    xl: "64px",
  },
  radius: {
    none: "0px",
    xs: "8px",
    sm: "16px",

    md: "32px",
    lg: "64px",
    xl: "128px",
  },
  defaultRadius: "xs",
  components: {
    Modal: Modal.extend({
      styles(theme) {
        return {
          header: {
            background: "black",
            borderBottom: `0.1rem ${theme.colors.dark[9]} solid`,
          },
          content: {
            border: `0.1rem solid ${theme.colors.dark[9]}`,
            background: "#000000",
          },
        };
      },
      defaultProps: {
        bd: `1px solid `,
      },
    }),
    TextInput: TextInput.extend({
      defaultProps: {
        bd: "none",
      },

      styles(theme, props, ctx) {
        return {
          input: {
            background: theme.colors.dark[9],
          },
        };
      },
    }),
    Textarea: Textarea.extend({
      styles(theme) {
        return {
          input: {
            color: theme.white,
            border: `${theme.colors.blue[6]} 1px solid`,
            background: theme.black,
          },
        };
      },
    }),
  },
});
