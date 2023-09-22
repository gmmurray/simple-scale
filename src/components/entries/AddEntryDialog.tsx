import { Entry, isGoalNewRecord, isNewEntryRecord } from '../../data/appData';
import { useCallback, useEffect, useState } from 'react';

import EntryForm from './EntryForm';
import FormDialog from '../shared/FormDialog';
import { nanoid } from 'nanoid';
import { useEntriesProvider } from '../../data/entries/entriesContext';
import { useSettingsProvider } from '../../data/settings/settingsContext';
import { useSnackbarAlert } from '../shared/snackbar/snackbarContext';

type Props = {
  open: boolean;
  onClose: () => void;
};
function AddEntryDialog({ open, onClose }: Props) {
  const { settings } = useSettingsProvider();
  const { entries, update } = useEntriesProvider();
  const snackbar = useSnackbarAlert();

  const [formValues, setFormValues] = useState<Entry>({
    ...defaultValues,
    timestamp: new Date(),
  });

  useEffect(() => {
    setFormValues({ ...defaultValues, timestamp: new Date() });
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

    if (isGoalNewRecord(formValues, entries, settings)) {
      snackbar.success(`You've reached your goal!`);
    } else if (isNewEntryRecord(formValues, entries, settings)) {
      snackbar.success('This is a new personal best!');
    }
    onClose();
  }, [entries, formValues, isFormValid, onClose, settings, snackbar, update]);

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
