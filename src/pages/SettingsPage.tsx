import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Settings, unitLabelMap } from '../data/appData';
import { useCallback, useEffect, useState } from 'react';

import { useSettingsProvider } from '../data/settings/settingsContext';
import { useSnackbarAlert } from '../components/shared/snackbar/snackbarContext';

function SettingsPage() {
  const snackbar = useSnackbarAlert();
  const { settings, update } = useSettingsProvider();

  const handleChange = useCallback(
    async function <TKey extends keyof Settings>(
      key: TKey,
      value: Settings[TKey],
    ) {
      await update({ ...settings, [key]: value });
      snackbar.success('Settings saved');
    },
    [settings, snackbar, update],
  );

  return (
    <Stack spacing={2} sx={{ my: 2 }}>
      <GoalsSection
        sectionValue={settings.goals}
        onChange={value => handleChange('goals', value)}
      />
    </Stack>
  );
}

export default SettingsPage;

type SettingsSectionProps<TKey extends keyof Settings> = {
  sectionValue: Settings[TKey];
  onChange: (value: Settings[TKey]) => void;
};

const GoalsSection = ({
  sectionValue,
  onChange,
}: SettingsSectionProps<'goals'>) => {
  const [weightGoal, setWeightGoal] = useState<Settings['goals']['weight']>(
    sectionValue.weight,
  );

  useEffect(() => {
    setWeightGoal(sectionValue.weight);
  }, [sectionValue.weight]);

  const [startWeightField, setStartWeightField] = useState(
    sectionValue.weight?.start?.toString() ?? '',
  );
  const [endWeightField, setEndWeightField] = useState(
    sectionValue.weight?.end?.toString() ?? '',
  );

  useEffect(() => {
    setStartWeightField(sectionValue.weight?.start?.toString() ?? '');
    setEndWeightField(sectionValue.weight?.end?.toString() ?? '');
  }, [sectionValue.weight?.end, sectionValue.weight?.start]);

  const startWeightValueError =
    weightGoal && Number.isNaN(weightGoal.start)
      ? 'Weight must be a valid number'
      : undefined;

  const endWeightValueError =
    weightGoal && Number.isNaN(weightGoal.end)
      ? 'Weight must be a valid number'
      : undefined;

  const handleSave = useCallback(() => {
    if (startWeightValueError || endWeightValueError) {
      return;
    }

    onChange({ ...sectionValue, weight: weightGoal });
  }, [
    startWeightValueError,
    endWeightValueError,
    onChange,
    sectionValue,
    weightGoal,
  ]);

  const handleReset = useCallback(() => {
    setWeightGoal(sectionValue.weight);
    setStartWeightField(sectionValue.weight?.start?.toString() ?? '');
    setEndWeightField(sectionValue.weight?.end?.toString() ?? '');
  }, [sectionValue.weight]);

  const handleStartWeightValueChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const str = event.target.value;
      setStartWeightField(str);
      const num = parseFloat(str);
      setWeightGoal(state => ({
        ...state,
        start: num,
        end: state?.end ?? 0,
        unit: state?.unit ?? 'lbs',
      }));
    },
    [],
  );

  const handleEndWeightValueChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const str = event.target.value;
      setEndWeightField(str);
      const num = parseFloat(str);
      setWeightGoal(state => ({
        ...state,
        end: num,
        start: state?.start ?? 0,
        unit: state?.unit ?? 'lbs',
      }));
    },
    [],
  );

  const handleClear = useCallback(
    () => onChange({ weight: undefined }),
    [onChange],
  );

  return (
    <Paper sx={{ p: 2 }} id="goals-weight">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Goals</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Weight</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={startWeightField}
            label="Start weight"
            onChange={handleStartWeightValueChange}
            fullWidth
            error={!!startWeightValueError}
            helperText={startWeightValueError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={endWeightField}
            label="End weight"
            onChange={handleEndWeightValueChange}
            fullWidth
            error={!!endWeightValueError}
            helperText={endWeightValueError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Units</InputLabel>
            <Select
              disabled
              value={sectionValue.weight?.unit ?? 'lbs'}
              label="Units"
              onChange={e =>
                setWeightGoal(state => ({
                  ...state,
                  start: state?.start ?? 0,
                  end: state?.end ?? 0,
                  unit: e.target.value as Required<
                    Settings['goals']
                  >['weight']['unit'],
                }))
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
        <Grid item xs={12} sx={{ display: 'flex' }}>
          <Stack sx={{ ml: 'auto' }} direction="row" spacing={2}>
            <Button color="error" onClick={handleClear}>
              Clear
            </Button>
            <Button color="inherit" onClick={handleReset}>
              Reset
            </Button>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};
