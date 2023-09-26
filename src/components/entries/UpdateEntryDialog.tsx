import { Entry, isGoalNewRecord, isNewEntryRecord } from '../../data/appData';
import { useCallback, useEffect, useState } from 'react';

import { Button } from '@mui/material';
import EntryForm from './EntryForm';
import FormDialog from '../shared/FormDialog';
import { useEntriesProvider } from '../../data/entries/entriesContext';
import { useSettingsProvider } from '../../data/settings/settingsContext';
import { useSnackbarAlert } from '../shared/snackbar/snackbarContext';

type Props = {
  open: boolean;
  entry: Entry;
  onClose: () => void;
};
function UpdateEntryDialog({ open, entry, onClose }: Props) {
  const snackbar = useSnackbarAlert();
  const { settings } = useSettingsProvider();
  const { entries, update } = useEntriesProvider();

  const [formValues, setFormValues] = useState<Entry>(entry);

  useEffect(() => {
    setFormValues(entry);
  }, [entry, open]);

  const isFormValid = !Number.isNaN(formValues.value);

  const handleUpdateEntry = useCallback(async () => {
    if (!isFormValid) {
      return;
    }

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

    await update(updatedEntries);

    if (isGoalNewRecord(formValues, entries, settings)) {
      snackbar.success(`You've reached your goal!`);
    } else if (isNewEntryRecord(formValues, entries, settings)) {
      snackbar.success('This is a new personal best!');
    }

    onClose();
  }, [
    entries,
    entry.id,
    formValues,
    isFormValid,
    onClose,
    settings,
    snackbar,
    update,
  ]);

  const handleRemoveEntry = useCallback(async () => {
    if (!confirm('Are you sure you want to delete this entry?')) {
      return;
    }

    const updatedEntries = entries.filter(e => e.id !== entry.id);
    await update(updatedEntries);
    onClose();
  }, [entries, entry.id, onClose, update]);

  return (
    <FormDialog
      open={open}
      onClose={onClose}
      title="Update entry"
      onSave={handleUpdateEntry}
      disabled={!isFormValid}
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
