import { ThemeOptions, createTheme, responsiveFontSizes } from '@mui/material';

const theme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#FDB750',
    },
    secondary: {
      main: '#FD6050',
    },
    info: {
      main: '#50FDB7',
    },
    background: {
      default: '#0a0a0a',
      paper: '#212121',
    },
  },
};

export const muiTheme = responsiveFontSizes(createTheme(theme));
