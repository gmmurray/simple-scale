import { ThemeOptions, createTheme, responsiveFontSizes } from '@mui/material';

const theme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      dark: '#0A2472',
      main: '#4d4e91',
    },
    background: {
      paper: '#2a2930',
      default: '#15141b',
    },
  },
};

export const muiTheme = responsiveFontSizes(createTheme(theme));
