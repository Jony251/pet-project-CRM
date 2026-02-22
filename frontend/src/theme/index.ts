import { createTheme, type ThemeOptions } from '@mui/material';
import { palette as lightPalette, darkPalette } from './palette';
import { typography } from './typography';

function buildThemeOptions(mode: 'light' | 'dark'): ThemeOptions {
  const pal = mode === 'light' ? lightPalette : darkPalette;

  return {
    palette: pal,
    typography,
    spacing: 8,
    shape: { borderRadius: 8 },
    breakpoints: {
      values: { xs: 0, sm: 640, md: 768, lg: 1024, xl: 1280 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': { width: 6, height: 6 },
            '&::-webkit-scrollbar-thumb': { backgroundColor: mode === 'light' ? '#cbd5e1' : '#475569', borderRadius: 3 },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 500,
            padding: '8px 16px',
            boxShadow: 'none',
            '&:hover': { boxShadow: 'none' },
          },
          containedPrimary: {
            background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
            '&:hover': { background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)' },
          },
        },
        defaultProps: { disableElevation: true },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: mode === 'light'
              ? '0 1px 3px 0 rgba(0,0,0,0.04), 0 1px 2px -1px rgba(0,0,0,0.04)'
              : '0 1px 3px 0 rgba(0,0,0,0.3)',
            border: `1px solid ${mode === 'light' ? '#e2e8f0' : '#334155'}`,
            backgroundImage: 'none',
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: { padding: 24, '&:last-child': { paddingBottom: 24 } },
        },
      },
      MuiPaper: {
        styleOverrides: { root: { backgroundImage: 'none' } },
      },
      MuiChip: {
        styleOverrides: { root: { fontWeight: 500, fontSize: '0.75rem' } },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderColor: mode === 'light' ? '#e2e8f0' : '#334155',
            padding: '12px 16px',
          },
          head: {
            fontWeight: 600,
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: mode === 'light' ? '#64748b' : '#94a3b8',
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: { root: { borderRadius: 4, height: 6 } },
      },
      MuiAvatar: {
        styleOverrides: { root: { fontSize: '0.875rem', fontWeight: 600 } },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: { backgroundColor: '#1e293b', fontSize: '0.75rem', borderRadius: 6, padding: '6px 12px' },
        },
      },
      MuiIconButton: {
        styleOverrides: { root: { borderRadius: 8 } },
      },
      MuiTextField: {
        defaultProps: { size: 'small' },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: mode === 'light' ? '#e2e8f0' : '#334155',
            },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: { borderRadius: 16, backgroundImage: 'none' },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: { textTransform: 'none', fontWeight: 500, fontSize: '0.875rem' },
        },
      },
    },
  };
}

export function buildTheme(mode: 'light' | 'dark') {
  return createTheme(buildThemeOptions(mode));
}
