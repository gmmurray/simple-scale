import './styles.scss';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CssBaseline from '@mui/material/CssBaseline';
import DataProvider from './data/DataProvider.tsx';
import { LocalizationProvider } from '@mui/x-date-pickers';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { SnackbarAlertProvider } from './components/shared/snackbar/SnackbarProvider.tsx';
import { ThemeProvider } from '@mui/material';
import { muiTheme } from './muiTheme.ts';
import { router } from './router.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={muiTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <SnackbarAlertProvider>
          <DataProvider>
            <RouterProvider router={router} />
          </DataProvider>
        </SnackbarAlertProvider>
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
