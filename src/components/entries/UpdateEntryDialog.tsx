import { useCallback, useEffect, useState } from 'react';

import { Button } from '@mui/material';
import { Entry } from '../../data/appData';
import EntryForm from './EntryForm';
import FormDialog from '../shared/FormDialog';
import { useDataProvider } from '../../data/dataContext';

type Props = {
  open: boolean;
  entry: Entry;
  onClose: () => void;
};
function UpdateEntryDialog({ open, entry, onClose }: Props) {
  const {
    data: { entries },
    updateEntries,
  } = useDataProvider();

  const [formValues, setFormValues] = useState<Entry>(entry);

  useEffect(() => {
    setFormValues(entry);
  }, [entry, open]);

  const handleUpdateEntry = useCallback(async () => {
    const existing = entries.find(e => e.id === entry.id);
    if (!existing) {
      return;
    }

    const updatedEntries = entries.map(e => {
      if (e.id === entry.id) {
        return {
          ...e,
          ...formValues,
        };
      }

      return e;
    });

    await updateEntries(updatedEntries);
    onClose();
  }, [entries, entry.id, formValues, onClose, updateEntries]);

  const handleRemoveEntry = useCallback(async () => {
    if (!confirm('Are you sure you want to delete this entry?')) {
      return;
    }

    const updatedEntries = entries.filter(e => e.id !== entry.id);
    await updateEntries(updatedEntries);
    onClose();
  }, [entries, entry.id, onClose, updateEntries]);

  return (
    <FormDialog
      open={open}
      onClose={onClose}
      title="Update entry"
      onSave={handleUpdateEntry}
    >
      <Button
        size="small"
        color="error"
        onClick={handleRemoveEntry}
        sx={{ mb: 1 }}
      >
        Remove
      </Button>
      <EntryForm
        values={formValues}
        onChange={(key, value) =>
          setFormValues(state => ({ ...state, [key]: value }))
        }
      />
    </FormDialog>
  );
}

export default UpdateEntryDialog;
