import { Box, CircularProgress } from '@mui/material';
import {
  DataProviderContext,
  DataProviderValue,
  defaultDataProviderValue,
} from './dataContext';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import datastore, { loadWithDefault } from '../localForage';

import { APP_DATA_STORAGE_KEY } from './constants';
import { AppData } from './appData';
import EntriesProvider from './entries/EntriesProvider';

type DataProviderProps = PropsWithChildren;
function DataProvider({ children }: DataProviderProps) {
  const [loading, setLoading] = useState(true);
  const [appData, setAppData] = useState<AppData>({ entries: [] });

  const loadAppData = useCallback(async () => {
    const data = await loadWithDefault(
      APP_DATA_STORAGE_KEY,
      defaultDataProviderValue.data,
    );

    setAppData(data);
  }, []);

  useEffect(() => {
    const load = async () => {
      await loadAppData();
      setLoading(false);
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    load();
  }, [loadAppData]);

  const handleAppDataChange = useCallback(
    async (updates: Partial<AppData>) => {
      await datastore.setItem(APP_DATA_STORAGE_KEY, { ...appData, ...updates });
      await loadAppData();
    },
    [appData, loadAppData],
  );

  const contextValue: DataProviderValue = {
    loading,
    updateData: handleAppDataChange,
    data: appData,
  };

  if (loading) {
    return <FullScreenLoader />;
  }

  return (
    <DataProviderContext.Provider value={contextValue}>
      <EntriesProvider>{children}</EntriesProvider>
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
