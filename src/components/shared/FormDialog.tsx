import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { Fragment, PropsWithChildren } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';

type Props = PropsWithChildren<{
  open: boolean;
  onClose: () => void;
  title: string;
  onSave: () => void | Promise<void>;
}>;

function FormDialog({ open, onClose, title, onSave, children }: Props) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Fragment>
      <Dialog
        fullScreen={isSmallScreen}
        open={open}
        onClose={onClose}
        TransitionComponent={isSmallScreen ? SlideTransition : undefined}
        maxWidth={isSmallScreen ? undefined : 'sm'}
        fullWidth
      >
        {isSmallScreen && (
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={onClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {title}
              </Typography>
              <Button autoFocus color="inherit" onClick={onSave}>
                Save
              </Button>
            </Toolbar>
          </AppBar>
        )}
        {!isSmallScreen && <DialogTitle>{title}</DialogTitle>}
        <DialogContent>{children}</DialogContent>
        {!isSmallScreen && (
          <DialogActions>
            <Button onClick={onClose} color="inherit">
              Cancel
            </Button>
            <Button onClick={onSave} variant="contained">
              Save
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </Fragment>
  );
}

export default FormDialog;

const SlideTransition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="left" ref={ref} {...props} />;
});
