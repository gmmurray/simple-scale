import { createContext, useContext } from 'react';

import { AppData } from './appData';

export type DataProviderValue = {
  loading: boolean;
  data: AppData;
  updateData: (updates: Partial<AppData>) => Promise<void> | void;
};

export const defaultDataProviderValue: DataProviderValue = {
  loading: true,
  data: {
    entries: [],
  },
  updateData: () => {},
};

export const DataProviderContext = createContext(defaultDataProviderValue);

export const useDataProvider = () => useContext(DataProviderContext);
