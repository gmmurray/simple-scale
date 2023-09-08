import { createContext, useContext } from 'react';

import { AppData } from './appData';
import { DEFAULT_APP_DATA } from './constants';

export type DataProviderValue = {
  loading: boolean;
  data: AppData;
  updateData: (updates: Partial<AppData>) => Promise<void> | void;
};

export const defaultDataProviderValue: DataProviderValue = {
  loading: true,
  data: DEFAULT_APP_DATA,
  updateData: () => {},
};

export const DataProviderContext = createContext(defaultDataProviderValue);

export const useDataProvider = () => useContext(DataProviderContext);
