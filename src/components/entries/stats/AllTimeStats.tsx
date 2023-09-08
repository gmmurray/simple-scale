import EntryStats from './EntryStats';
import { Fragment } from 'react';
import { useGetAllEntryStats } from '../../../data/entries/entryStats';

function AllTimeStats() {
  const stats = useGetAllEntryStats();
  return (
    <Fragment>
      <EntryStats stats={stats} />
    </Fragment>
  );
}

export default AllTimeStats;
