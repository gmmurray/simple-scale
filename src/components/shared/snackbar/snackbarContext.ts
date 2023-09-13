import { createContext, useContext } from 'react';

export type SnackbarAlertType = 'error' | 'warning' | 'info' | 'success';

export type SnackbarAlertContextValue = {
  send: (
    message: string,
    type: SnackbarAlertType,
    description?: string,
  ) => void;
  success: (message: string, description?: string) => void;
  error: (message: string, description?: string) => void;
  onClose: () => void;
  open: boolean;
  message?: string;
};

const initialValue: SnackbarAlertContextValue = {
  send: () => {},
  success: () => {},
  error: () => {},
  onClose: () => {},
  open: false,
};

export const SnackbarAlertContext = createContext(initialValue);

export const useSnackbarAlert = () => useContext(SnackbarAlertContext);
