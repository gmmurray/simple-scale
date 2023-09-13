import { useCallback, useEffect, useState } from 'react';

import { Entry } from '../../data/appData';
import EntryForm from './EntryForm';
import FormDialog from '../shared/FormDialog';
import { getMinValue } from '../../util/mathUtil';
import { nanoid } from 'nanoid';
import { useEntriesProvider } from '../../data/entries/entriesContext';
import { useSnackbarAlert } from '../shared/snackbar/snackbarContext';

type Props = {
  open: boolean;
  onClose: () => void;
};
function AddEntryDialog({ open, onClose }: Props) {
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

    if (isNewRecord(formValues, entries)) {
      console.log('here');
      snackbar.success('This is a new personal best!');
    }
    onClose();
  }, [entries, formValues, isFormValid, onClose, snackbar, update]);

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

const isNewRecord = (entry: Entry, allEntries: Entry[]): boolean => {
  const minWeight = getMinValue(allEntries.map(e => e.value));

  return entry.value < minWeight;
};
