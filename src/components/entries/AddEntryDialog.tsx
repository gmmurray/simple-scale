import { useCallback, useEffect, useState } from 'react';

import { Entry } from '../../data/appData';
import EntryForm from './EntryForm';
import FormDialog from '../shared/FormDialog';
import { nanoid } from 'nanoid';
import { useEntriesProvider } from '../../data/entries/entriesContext';

type Props = {
  open: boolean;
  onClose: () => void;
};
function AddEntryDialog({ open, onClose }: Props) {
  const { entries, update } = useEntriesProvider();

  const [formValues, setFormValues] = useState<Entry>(defaultValues);

  useEffect(() => {
    setFormValues(defaultValues);
  }, [open]);

  const handleAddEntry = useCallback(async () => {
    const updatedEntries = entries.concat({ ...formValues, id: nanoid() });
    await update(updatedEntries);
    onClose();
  }, [entries, formValues, onClose, update]);

  return (
    <FormDialog
      open={open}
      onClose={onClose}
      title="New entry"
      onSave={handleAddEntry}
    >
      <EntryForm
        values={formValues}
        onChange={(key, value) =>
          setFormValues(state => ({ ...state, [key]: value }))
        }
      />
    </FormDialog>
  );
}

export default AddEntryDialog;

const defaultValues: Entry = {
  id: '',
  value: 0,
  timestamp: new Date(),
  unit: 'lbs',
};
