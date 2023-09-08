import { EntriesProviderContext, EntriesProviderValue } from './entriesContext';
import { PropsWithChildren, useCallback, useState } from 'react';

import AddEntryDialog from '../../components/entries/AddEntryDialog';
import { Entry } from '../appData';
import UpdateEntryDialog from '../../components/entries/UpdateEntryDialog';
import { useDataProvider } from '../dataContext';

type EntriesProviderProps = PropsWithChildren;

function EntriesProvider({ children }: EntriesProviderProps) {
  const {
    data: { entries },
    updateData,
  } = useDataProvider();

  const [addOpen, setAddOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<Entry | undefined>(
    undefined,
  );

  const handleEntriesChange = useCallback(
    async (updatedEntries: Entry[]) => updateData({ entries: updatedEntries }),
    [updateData],
  );

  const handleToggleAddDialog = useCallback(
    () => setAddOpen(state => !state),
    [],
  );

  const handleSelectEntry = useCallback(
    (entry: Entry | undefined) => setSelectedEntry(entry),
    [],
  );

  const contextValue: EntriesProviderValue = {
    entries,
    update: handleEntriesChange,
    toggleAddDialog: handleToggleAddDialog,
    selectEntry: handleSelectEntry,
  };

  return (
    <EntriesProviderContext.Provider value={contextValue}>
      {children}
      <AddEntryDialog open={addOpen} onClose={() => setAddOpen(false)} />
      {selectedEntry && (
        <UpdateEntryDialog
          open={!!selectedEntry}
          onClose={() => handleSelectEntry(undefined)}
          entry={selectedEntry}
        />
      )}
    </EntriesProviderContext.Provider>
  );
}

export default EntriesProvider;
