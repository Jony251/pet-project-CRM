import type { ThemeOptions } from '@mui/material';

export const typography: NonNullable<ThemeOptions['typography']> = {
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  h1: {
    fontSize: '2.25rem',
    fontWeight: 800,
    lineHeight: 1.2,
    letterSpacing: '-0.025em',
  },
  h2: {
    fontSize: '1.875rem',
    fontWeight: 700,
    lineHeight: 1.3,
    letterSpacing: '-0.025em',
  },
  h3: {
    fontSize: '1.5rem',
    fontWeight: 700,
    lineHeight: 1.4,
  },
  h4: {
    fontSize: '1.25rem',
    fontWeight: 700,
    lineHeight: 1.4,
  },
  h5: {
    fontSize: '1.125rem',
    fontWeight: 600,
    lineHeight: 1.5,
  },
  h6: {
    fontSize: '1rem',
    fontWeight: 600,
    lineHeight: 1.5,
  },
  subtitle1: {
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.5,
  },
  subtitle2: {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.57,
  },
  body1: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.5,
  },
  body2: {
    fontSize: '0.8125rem',
    fontWeight: 400,
    lineHeight: 1.5,
  },
  button: {
    fontSize: '0.875rem',
    fontWeight: 500,
    textTransform: 'none',
  },
  caption: {
    fontSize: '0.75rem',
    fontWeight: 500,
    lineHeight: 1.5,
  },
  overline: {
    fontSize: '0.625rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
};
