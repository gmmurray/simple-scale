import dayjs from 'dayjs';
import { roundToOneDecimal } from '../util/mathUtil';
import { sort } from 'fast-sort';

export interface Entry {
  timestamp: Date;
  value: number;
  unit: 'lbs';
  id: string;
}

export interface AppData {
  entries: Entry[];
}

export const getDiffInfo = (
  current: Entry,
  previous?: Entry,
): { diff: number; desirable: boolean } | undefined => {
  if (!previous) {
    return undefined;
  }

  const diff = roundToOneDecimal(current.value - previous.value);

  return {
    diff,
    desirable: diff < 0,
  };
};

export const unitLabelMap: Record<Entry['unit'], string> = {
  lbs: 'lbs',
};

export const sortEntries = (entries: Entry[]) =>
  sort(entries).desc(entry => dayjs(entry.timestamp).toDate());
