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

  const isFormValid = !Number.isNaN(formValues.value);

  const handleAddEntry = useCallback(async () => {
    if (!isFormValid) {
      return;
    }
    const updatedEntries = entries.concat({
      ...formValues,
      id: nanoid(),
    });
    await update(updatedEntries);
    onClose();
  }, [entries, formValues, isFormValid, onClose, update]);

  return (
    <FormDialog
      open={open}
      onClose={onClose}
      title="New entry"
      onSave={handleAddEntry}
      disabled={!isFormValid}
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
  value: '' as unknown as number,
  timestamp: new Date(),
  unit: 'lbs',
};
