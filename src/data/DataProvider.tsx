import { AppData, Entry } from './appData';
import { Box, CircularProgress } from '@mui/material';
import {
  DataProviderContext,
  DataProviderValue,
  defaultDataProviderValue,
} from './dataContext';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import datastore, { loadWithDefault } from '../localForage';

import AddEntryDialog from '../components/entries/AddEntryDialog';

type DataProviderProps = PropsWithChildren;
function DataProvider({ children }: DataProviderProps) {
  const [loading, setLoading] = useState(true);
  const [appData, setAppData] = useState<AppData>({ entries: [] });
  const [addOpen, setAddOpen] = useState(false);

  const loadAppData = useCallback(async () => {
    const data = await loadWithDefault(
      'app-data',
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
      await datastore.setItem('app-data', { ...appData, ...updates });
      await loadAppData();
    },
    [appData, loadAppData],
  );

  const handleEntriesChange = useCallback(
    async (entries: Entry[]) => handleAppDataChange({ entries }),
    [handleAppDataChange],
  );

  const contextValue: DataProviderValue = {
    loading,
    updateData: handleAppDataChange,
    updateEntries: handleEntriesChange,
    data: appData,
    toggleAddDialog: () => setAddOpen(!addOpen),
  };

  if (loading) {
    return <FullScreenLoader />;
  }

  return (
    <DataProviderContext.Provider value={contextValue}>
      {children}
      <AddEntryDialog open={addOpen} onClose={() => setAddOpen(false)} />
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
