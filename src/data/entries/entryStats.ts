import { Entry, sortEntries } from '../appData';
import {
  getThisWeekDateRange,
  isDateBetweenDatesInclusive,
  isSameMonthThisYear,
} from '../../util/dateUtil';

import dayjs from 'dayjs';
import { useEntriesProvider } from './entriesContext';

export type EntryReportType = 'week' | 'month' | 'year' | 'all';

export const entryReportTypeLabelMap: Record<EntryReportType, string> = {
  week: 'This week',
  month: 'Month (this year)',
  year: 'Year',
  all: 'All time',
};

export type TimedEntryStats = {
  type: EntryReportType;
  entries: Entry[];
  weekdayCounts: Record<number, number>;
};

export const useGetWeekEntryStats = (): TimedEntryStats => {
  const { entries: allEntries } = useEntriesProvider();
  const unsorted: Entry[] = [];
  const counts: Record<number, number> = getDayRecord();
  const { start, end } = getThisWeekDateRange();

  for (const entry of allEntries) {
    if (isDateBetweenDatesInclusive(entry.timestamp, start, end)) {
      unsorted.push(entry);
      const dayIndex = dayjs(entry.timestamp).day();
      counts[dayIndex] = (counts[dayIndex] ?? 0) + 1;
    }
  }

  return {
    type: 'week',
    entries: sortEntries(unsorted, 'asc'),
    weekdayCounts: counts,
  };
};

export const useGetMonthEntryStats = (monthIndex: number): TimedEntryStats => {
  const { entries: allEntries } = useEntriesProvider();
  const unsorted: Entry[] = [];
  const counts: Record<number, number> = getDayRecord();

  for (const entry of allEntries) {
    if (isSameMonthThisYear(monthIndex, entry.timestamp)) {
      unsorted.push(entry);
      const dayIndex = dayjs(entry.timestamp).day();
      counts[dayIndex] = (counts[dayIndex] ?? 0) + 1;
    }
  }

  return {
    type: 'month',
    entries: sortEntries(unsorted, 'asc'),
    weekdayCounts: counts,
  };
};

export const useGetYearEntryStats = (year: number): TimedEntryStats => {
  const { entries: allEntries } = useEntriesProvider();
  const unsorted: Entry[] = [];
  const counts: Record<number, number> = getDayRecord();

  for (const entry of allEntries) {
    if (dayjs(entry.timestamp).year() === year) {
      unsorted.push(entry);
      const dayIndex = dayjs(entry.timestamp).day();
      counts[dayIndex] = (counts[dayIndex] ?? 0) + 1;
    }
  }

  return {
    type: 'year',
    entries: sortEntries(unsorted, 'asc'),
    weekdayCounts: counts,
  };
};

export const useGetAllEntryStats = (): TimedEntryStats => {
  const { entries: allEntries } = useEntriesProvider();
  const counts: Record<number, number> = getDayRecord();

  for (const entry of allEntries) {
    const dayIndex = dayjs(entry.timestamp).day();
    counts[dayIndex] = (counts[dayIndex] ?? 0) + 1;
  }

  return {
    type: 'all',
    entries: sortEntries(allEntries, 'asc'),
    weekdayCounts: counts,
  };
};

const getDayRecord = () => ({
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
});
