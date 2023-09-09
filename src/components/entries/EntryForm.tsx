import { Entry, unitLabelMap } from '../../data/appData';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

type Props = {
  values: Entry;
  onChange: <T, K extends keyof T>(key: K, value: T[K]) => void;
};

function EntryForm({ values, onChange }: Props) {
  return (
    <Grid container spacing={2} sx={{ py: 2 }}>
      <Grid item xs={12} sm={6}>
        <TextField
          value={values.value}
          label="Weight"
          onChange={e =>
            onChange<Entry, 'value'>('value', Number(e.target.value))
          }
          inputProps={{ type: 'number' }}
          fullWidth
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
