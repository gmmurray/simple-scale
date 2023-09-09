import { Entry, unitLabelMap } from '../../data/appData';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useCallback, useState } from 'react';

import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

type Props = {
  values: Entry;
  onChange: <T, K extends keyof T>(key: K, value: T[K]) => void;
};

function EntryForm({ values, onChange }: Props) {
  const [valueField, setValueField] = useState(values.value.toString());

  const handleValueFieldChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const str = event.target.value;
      setValueField(str);
      const num = parseFloat(str);
      onChange<Entry, 'value'>('value', num);
    },
    [onChange],
  );

  const valueError = Number.isNaN(values.value)
    ? 'Weight must be a valid number'
    : undefined;
  return (
    <Grid container spacing={2} sx={{ py: 2 }}>
      <Grid item xs={12} sm={6}>
        <TextField
          value={valueField}
          label="Weight"
          onChange={handleValueFieldChange}
          fullWidth
          error={!!valueError}
          helperText={valueError}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Units</InputLabel>
          <Select
            disabled
            value={values.unit}
            label="Units"
            onChange={e =>
              onChange<Entry, 'unit'>('unit', e.target.value as Entry['unit'])
            }
          >
            {Object.entries(unitLabelMap).map((kvp, index) => {
              return (
                <MenuItem key={index} value={kvp[0]}>
                  {kvp[1]}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <DateTimePicker
          label="Date"
          value={dayjs(values.timestamp)}
          onChange={value =>
            onChange<Entry, 'timestamp'>(
              'timestamp',
              value?.toDate() ?? new Date(),
            )
          }
          slotProps={{
            textField: {
              fullWidth: true,
            },
          }}
        />
      </Grid>
    </Grid>
  );
}

export default EntryForm;
