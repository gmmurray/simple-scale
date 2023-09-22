import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material';

export const useIsSmallScreen = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return isSmallScreen;
};
