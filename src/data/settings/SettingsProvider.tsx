import { PropsWithChildren, useCallback } from 'react';
import {
  SettingsProviderContext,
  SettingsProviderValue,
  defaultSettingsProviderValue,
} from './settingsContext';

import { Settings } from '../appData';
import { useDataProvider } from '../dataContext';

function SettingsProvider({ children }: PropsWithChildren) {
  const {
    data: { settings },
    updateData,
  } = useDataProvider();

  const handleSettingsChange = useCallback(
    async (updatedSettings: Settings) =>
      updateData({ settings: updatedSettings }),
    [updateData],
  );

  const contextValue: SettingsProviderValue = {
    ...defaultSettingsProviderValue,
    settings,
    update: handleSettingsChange,
  };
  return (
    <SettingsProviderContext.Provider value={contextValue}>
      {children}
    </SettingsProviderContext.Provider>
  );
}

export default SettingsProvider;
