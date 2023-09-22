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

  const orderedEntries = entries.reverse();

  return (
    <Paper sx={{ p: 2 }} className="entry-line-chart-container">
      <Typography variant="h6">{title}</Typography>
      {entries.length > 1 && (
        <Typography variant="subtitle1" color="text.secondary">
          {`${orderedEntries[0].value} - ${
            orderedEntries[orderedEntries.length - 1].value
          } ${orderedEntries[0].unit}`}
        </Typography>
      )}
      <LineChart
        dataset={orderedEntries.map(e => ({
          x: dayjs(e.timestamp).toDate(),
          y: e.value,
        }))}
        xAxis={[{ dataKey: 'x' }]}
        yAxis={[{ min: minWeight - 5 }]}
        series={[
          {
            curve: 'linear',
            dataKey: 'y',
            color: theme.palette.info.main,
          },
        ]}
        height={500}
      />
    </Paper>
  );
}

export default EntryLineChart;
