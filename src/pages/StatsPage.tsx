import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import {
  EntryReportType,
  entryReportTypeLabelMap,
} from '../data/entries/entryStats';
import { Fragment, useState } from 'react';

import AllTimeStats from '../components/entries/stats/AllTimeStats';
import MonthStats from '../components/entries/stats/MonthStats';
import WeekStats from '../components/entries/stats/WeekStats';
import YearStats from '../components/entries/stats/YearStats';

function StatsPage() {
  const [statsType, setStatsType] = useState<EntryReportType>('week');

  const renderReport = () => {
    if (statsType === 'week') {
      return <WeekStats />;
    } else if (statsType === 'month') {
      return <MonthStats />;
    } else if (statsType === 'year') {
      return <YearStats />;
    }

    return <AllTimeStats />;
  };
  return (
    <Fragment>
      <Grid container spacing={2} sx={{ my: 2 }}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Stats type</InputLabel>
            <Select
              value={statsType}
              label="Stats type"
              onChange={e => setStatsType(e.target.value as EntryReportType)}
            >
              {Object.entries(entryReportTypeLabelMap).map((kvp, index) => {
                return (
                  <MenuItem key={index} value={kvp[0]}>
                    {kvp[1]}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box sx={{ pb: 0.125 }}>{renderReport()}</Box>
    </Fragment>
  );
}

export default StatsPage;
