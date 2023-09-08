import { createContext, useContext } from 'react';

import { Entry } from '../appData';

export type EntriesProviderValue = {
  entries: Entry[];
  update: (entries: Entry[]) => Promise<void> | void;
  toggleAddDialog: () => void;
  selectEntry: (entry: Entry | undefined) => void;
  toggleCsvDialog: () => void;
};

export const defaultEntriesProviderValue: EntriesProviderValue = {
  entries: [],
  update: () => {},
  toggleAddDialog: () => {},
  selectEntry: () => {},
  toggleCsvDialog: () => {},
};

export const EntriesProviderContext = createContext(
  defaultEntriesProviderValue,
);

export const useEntriesProvider = () => useContext(EntriesProviderContext);
