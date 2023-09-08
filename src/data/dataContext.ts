import { AppData, Entry } from './appData';
import { createContext, useContext } from 'react';

export type DataProviderValue = {
  loading: boolean;
  data: AppData;
  updateData: (updates: Partial<AppData>) => Promise<void> | void;
  updateEntries: (entries: Entry[]) => Promise<void> | void;
  toggleAddDialog: () => void;
};

export const defaultDataProviderValue: DataProviderValue = {
  loading: true,
  data: {
    entries: [],
  },
  updateData: () => {},
  updateEntries: () => {},
  toggleAddDialog: () => {},
};

export const DataProviderContext = createContext(defaultDataProviderValue);

export const useDataProvider = () => useContext(DataProviderContext);
