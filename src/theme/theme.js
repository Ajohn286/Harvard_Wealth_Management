import {
    theme as invisibleTheme,
    paletteLight,
  } from '@invisible/design-system-tokens'
  import { LinearProgress } from '@mui/material'
  import { createTheme } from '@mui/material/styles'
  import { Inter } from 'next/font/google'

  
  const inter = Inter({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
  })
  
  const theme = createTheme({
    palette: {
      ...paletteLight,
      mode: 'light',
      secondary: {
        main: '#000000',
        light: '#333333',
        dark: '#000000',
        contrastText: '#FFFFFF',
      },
      background: {
        paper: '#ffffff',
      },
    },
    typography: {
      ...invisibleTheme.typography,
      fontFamily: inter.style.fontFamily,
      button: {
        textTransform: 'none',
      },
    },
    breakpoints: {
      values: {
        ...invisibleTheme.breakpoints,
      },
    },
    components: {
      MuiAlert: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            ...(ownerState.severity === 'info' && {
              backgroundColor: '#60a5fa',
            }),
          }),
        },
      },
      MuiDataGrid: {
        defaultProps: {
          slots: {
            // @ts-expect-error @ts-ignore
            loadingOverlay: LinearProgress,
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: '0.75rem',
            lineHeight: '140%',
          },
        },
      },
    },
  })
  
  export default theme