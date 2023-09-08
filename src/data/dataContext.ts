import { createContext, useContext } from 'react';

import { AppData } from './appData';

export type DataProviderValue = {
  loading: boolean;
  data: AppData;
};

export const defaultDataProviderValue: DataProviderValue = {
  loading: true,
  data: {
    entries: [],
  },
};

export const DataProviderContext = createContext(defaultDataProviderValue);

export const useDataProvider = () => useContext(DataProviderContext);
