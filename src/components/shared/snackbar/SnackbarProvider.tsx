import { Alert, AlertTitle, Snackbar } from '@mui/material';
import { Fragment, useCallback, useState } from 'react';
import {
  SnackbarAlertContext,
  SnackbarAlertContextValue,
  SnackbarAlertType,
} from './snackbarContext';

import { useIsSmallScreen } from '../../../util/useIsSmallScreen';

export const SnackbarAlertProvider = ({
  children,
}: React.PropsWithChildren) => {
  const isSmallScreen = useIsSmallScreen();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('Alert');
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [type, setType] = useState<SnackbarAlertType>('info');

  const handleOpen = useCallback(
    (message: string, type: SnackbarAlertType, description?: string) => {
      setOpen(true);
      setMessage(message);
      setDescription(description);
      setType(type);
    },
    [],
  );

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const value: SnackbarAlertContextValue = {
    send: handleOpen,
    success: (msg, description) => handleOpen(msg, 'success', description),
    error: (msg, description) => handleOpen(msg, 'error', description),
    onClose: handleClose,
    open,
    message,
  };

  const renderMessage = () => {
    if (!message) {
      return undefined;
    }

    if (description) {
      return (
        <Fragment>
          <AlertTitle>{message}</AlertTitle>
          {description}
        </Fragment>
      );
    }

    return message;
  };

  return (
    <SnackbarAlertContext.Provider value={value}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: isSmallScreen ? 'top' : 'bottom',
          horizontal: 'center',
        }}
        sx={{ minWidth: '25%' }}
      >
        <Alert
          onClose={handleClose}
          severity={type}
          sx={{ width: '100%' }}
          variant="filled"
        >
          {renderMessage()}
        </Alert>
      </Snackbar>
    </SnackbarAlertContext.Provider>
  );
};
