import DailyEntryBarChart from '../charts/DailyEntryBarChart';
import EmptyDataset from '../charts/EmptyDataset';
import EntryLineChart from '../charts/EntryLineChart';
import { Fragment } from 'react';
import { Stack } from '@mui/material';
import { TimedEntryStats } from '../../../data/entries/entryStats';

type Props = {
  stats: TimedEntryStats;
};

function EntryStats({ stats }: Props) {
  if (stats.entries.length === 0) {
    return <EmptyDataset />;
  }

  return (
    <Stack spacing={2} sx={{ my: 2 }}>
      {stats.entries.length === 0 ? (
        <EmptyDataset />
      ) : (
        <Fragment>
          <EntryLineChart entries={stats.entries} title="Weights" />
          <DailyEntryBarChart
            weekdayCounts={stats.weekdayCounts}
            title="Weigh ins"
          />
        </Fragment>
      )}
    </Stack>
  );
}

export default EntryStats;
