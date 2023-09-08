import { Paper, Typography } from '@mui/material';

import { BarChart } from '@mui/x-charts';
import { getWeekdayName } from '../../../util/dateUtil';

type Props = {
  weekdayCounts: Record<number, number>;
  title: string;
};

function DailyEntryBarChart({ weekdayCounts, title }: Props) {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6">{title}</Typography>
      <BarChart
        xAxis={[
          {
            data: Object.keys(weekdayCounts).map(key => parseInt(key)),
            valueFormatter: (value: number) => getWeekdayName(value),
            scaleType: 'band',
          },
        ]}
        series={[
          {
            data: Object.values(weekdayCounts),
          },
        ]}
        height={350}
      />
    </Paper>
  );
}

export default DailyEntryBarChart;
