import type { CSSObject } from '@mantine/emotion';

export const hover: CSSObject = {
  '--color-hover': 'rgba(255,255,255,0.1)',
  '&:hover': {
    backgroundColor: 'var(--color-hover)',
  },
};
