import EntryStats from './EntryStats';
import { Fragment } from 'react';
import { useGetWeekEntryStats } from '../../../data/entries/entryStats';

function WeekStats() {
  const stats = useGetWeekEntryStats();
  return (
    <Fragment>
      <EntryStats stats={stats} />
    </Fragment>
  );
}

export default WeekStats;
