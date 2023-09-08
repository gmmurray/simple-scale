import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Fragment, useMemo, useState } from 'react';

import { Entry } from '../../../data/appData';
import EntryStats from './EntryStats';
import dayjs from 'dayjs';
import { useEntriesProvider } from '../../../data/entries/entriesContext';
import { useGetYearEntryStats } from '../../../data/entries/entryStats';

function YearStats() {
  const { entries } = useEntriesProvider();
  const [selectedYear, setSelectedYear] = useState(dayjs().year());
  const stats = useGetYearEntryStats(selectedYear);
  const yearOptions = useMemo(() => getYearOptions(entries), [entries]);
  return (
    <Fragment>
      <Box sx={{ mb: 2 }}>
        <FormControl>
          <InputLabel>Year</InputLabel>
          <Select
            value={selectedYear}
            label="Year"
            onChange={e => setSelectedYear(Number(e.target.value))}
          >
            {yearOptions.map((year, index) => {
              return (
                <MenuItem key={index} value={year}>
                  {year}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <EntryStats stats={stats} />
    </Fragment>
  );
}

export default YearStats;

const getYearOptions = (entries: Entry[]) => [
  ...new Set(
    entries
      .map(entry => dayjs(entry.timestamp).year())
      .sort((a, b) => (a > b ? -1 : 1)),
  ).values(),
];
