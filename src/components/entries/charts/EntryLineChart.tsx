import { Paper, Typography, useTheme } from '@mui/material';

import { Entry } from '../../../data/appData';
import { LineChart } from '@mui/x-charts';
import dayjs from 'dayjs';

type Props = {
  entries: Entry[];
  title: string;
};

function EntryLineChart({ entries, title }: Props) {
  const theme = useTheme();
  const minWeight = entries.reduce((prev, curr) =>
    prev.value < curr.value ? prev : curr,
  ).value;

  return (
    <Paper sx={{ p: 2 }} className="entry-line-chart-container">
      <Typography variant="h6">{title}</Typography>
      <LineChart
        xAxis={[
          {
            data: entries.reverse().map(e => dayjs(e.timestamp).toDate()),
          },
        ]}
        yAxis={[{ min: minWeight - 5 }]}
        series={[
          {
            curve: 'linear',
            data: entries.map(e => e.value),
            color: theme.palette.info.main,
          },
        ]}
        height={350}
      />
    </Paper>
  );
}

export default EntryLineChart;
