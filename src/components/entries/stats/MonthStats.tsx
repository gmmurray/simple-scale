import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Fragment, useState } from 'react';
import { getMonthByName, getMonthIndices } from '../../../util/dateUtil';

import EntryStats from './EntryStats';
import dayjs from 'dayjs';
import { useGetMonthEntryStats } from '../../../data/entries/entryStats';

function MonthStats() {
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month());
  const stats = useGetMonthEntryStats(selectedMonth);

  return (
    <Fragment>
      <Box sx={{ mb: 2 }}>
        <FormControl>
          <InputLabel>Month</InputLabel>
          <Select
            value={selectedMonth}
            label="Month"
            onChange={e => setSelectedMonth(Number(e.target.value))}
          >
            {getMonthIndices().map((monthIndex, index) => {
              return (
                <MenuItem key={index} value={monthIndex}>
                  {getMonthByName(monthIndex, 'full')}
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

export default MonthStats;
