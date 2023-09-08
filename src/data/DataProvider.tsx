import { Box, CircularProgress } from '@mui/material';
import {
  DataProviderContext,
  DataProviderValue,
  defaultDataProviderValue,
} from './dataContext';
import { PropsWithChildren, useEffect, useState } from 'react';

type DataProviderProps = PropsWithChildren;
function DataProvider({ children }: DataProviderProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  const contextValue: DataProviderValue = {
    ...defaultDataProviderValue,
    loading,
  };

  if (loading) {
    return <FullScreenLoader />;
  }

  return (
    <DataProviderContext.Provider value={contextValue}>
      {children}
    </DataProviderContext.Provider>
  );
}

export default DataProvider;

const FullScreenLoader = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  );
};
