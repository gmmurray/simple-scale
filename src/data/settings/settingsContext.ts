import { createContext, useContext } from 'react';

import { Settings } from '../appData';

export type SettingsProviderValue = {
  settings: Settings;
  update: (settings: Settings) => Promise<void> | void;
};

export const defaultSettingsProviderValue: SettingsProviderValue = {
  settings: {
    goals: {
      weight: undefined,
    },
  },
  update: () => {},
};

export const SettingsProviderContext = createContext(
  defaultSettingsProviderValue,
);

export const useSettingsProvider = () => useContext(SettingsProviderContext);
