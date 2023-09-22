import { Paper, Typography } from '@mui/material';
import {
  getWeekdayNameLong,
  getWeekdayNameShort,
} from '../../../util/dateUtil';

import { BarChart } from '@mui/x-charts';
import { getMaxValue } from '../../../util/mathUtil';
import { useMemo } from 'react';

type Props = {
  weekdayCounts: Record<number, number>;
  title: string;
};

function DailyEntryBarChart({ weekdayCounts, title }: Props) {
  const mostPopularDays = useMemo(
    () => getMostPopularDays(weekdayCounts),
    [weekdayCounts],
  );
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6">{title}</Typography>
      {!!mostPopularDays && mostPopularDays.length > 0 && (
        <Typography variant="subtitle1" color="text.secondary">
          {`Most popular day(s): ${mostPopularDays.join(', ')}`}
        </Typography>
      )}
      <BarChart
        dataset={Object.entries(weekdayCounts).map(([key, value]) => ({
          x: parseInt(key),
          y: value,
        }))}
        xAxis={[
          {
            dataKey: 'x',
            valueFormatter: (value: number) => getWeekdayNameShort(value),
            scaleType: 'band',
          },
        ]}
        series={[
          {
            dataKey: 'y',
          },
        ]}
        height={350}
      />
    </Paper>
  );
}

export default DailyEntryBarChart;

const getMostPopularDays = (
  weekdayCounts: Record<number, number>,
): string[] | undefined => {
  const map = new Map(
    Object.entries(weekdayCounts).map(([key, value]) => [parseInt(key), value]),
  );
  if (map.size === 0) {
    return undefined;
  }

  const maxCount = getMaxValue([...map.values()]);

  if (maxCount === 0) {
    return undefined;
  }

  return [...map.keys()]
    .filter(key => map.get(key) === maxCount)
    .map(key => getWeekdayNameLong(key));
};
