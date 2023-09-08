import { Box, Typography, useTheme } from '@mui/material';
import { Entry, sortEntries } from '../../../data/appData';

import { SparkLineChart } from '@mui/x-charts';
import dayjs from 'dayjs';
import { isThisCalendarYear } from '../../../util/dateUtil';
import { roundToOneDecimal } from '../../../util/mathUtil';
import { useEntriesProvider } from '../../../data/entries/entriesContext';
import { useMemo } from 'react';

function AnnualEntiresSparkline() {
  const theme = useTheme();
  const { entries } = useEntriesProvider();
  const entriesByMonth = useMemo(
    () => getEntriesThisYear(entries),
    [entries],
  ).reverse();
  return (
    <Box>
      <Typography variant="h5">{dayjs().year()} at a glance</Typography>
      <SparkLineChart
        height={300}
        data={entriesByMonth.map(entry => roundToOneDecimal(entry.value))}
        showTooltip
        showHighlight
        xAxis={{
          scaleType: 'time',
          data: entriesByMonth.map(entry => dayjs(entry.timestamp).toDate()),
          valueFormatter: (value: Date) => value.toLocaleDateString(),
        }}
        colors={[theme.palette.info.main]}
      />
    </Box>
  );
}

export default AnnualEntiresSparkline;

function getEntriesThisYear(entries: Entry[]) {
  const filtered = entries.filter(entry => isThisCalendarYear(entry.timestamp));
  return sortEntries(filtered);
}
