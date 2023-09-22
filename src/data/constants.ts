import { AppData } from './appData';

export const APP_DATA_STORAGE_KEY = 'app-data';

export const DEFAULT_APP_DATA: AppData = {
  entries: [],
  settings: {
    goals: {
      weight: undefined,
    },
  },
};
