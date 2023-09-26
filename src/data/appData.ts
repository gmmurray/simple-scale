import { getMinValue, roundToOneDecimal } from '../util/mathUtil';

import dayjs from 'dayjs';
import { sort } from 'fast-sort';

export interface Entry {
  timestamp: Date;
  value: number;
  unit: 'lbs';
  id: string;
}

export interface Settings {
  goals: {
    weight?: {
      start: Entry['value'];
      end: Entry['value'];
      unit: Entry['unit'];
    };
  };
}

export interface AppData {
  entries: Entry[];
  settings: Settings;
}

export const getDiffInfo = (
  current: Entry,
  previous?: Entry,
  goal?: 'gain' | 'lose',
): { diff: number; desirable: boolean } | undefined => {
  if (!previous) {
    return undefined;
  }

  const diff = roundToOneDecimal(current.value - previous.value);

  let desirable: boolean;

  if (goal === undefined || goal === 'lose') {
    desirable = diff < 0;
  } else {
    desirable = diff > 0;
  }

  return {
    diff,
    desirable,
  };
};

export const unitLabelMap: Record<Entry['unit'], string> = {
  lbs: 'lbs',
};

export const sortEntries = (entries: Entry[], dir: 'asc' | 'desc' = 'desc') =>
  sort(entries)[dir](entry => dayjs(entry.timestamp).toDate());

export const getOverallWeightGoal = (settings: Settings): 'gain' | 'lose' => {
  if (
    settings.goals.weight &&
    settings.goals.weight.start < settings.goals.weight.end
  ) {
    return 'gain';
  }

  return 'lose';
};

export const isAtOrPastWeightGoal = (
  entry: Entry,
  settings: Settings,
): boolean => {
  if (settings.goals.weight === undefined) {
    return false;
  }

  const overallGoal = getOverallWeightGoal(settings);
  if (overallGoal === 'gain' && entry.value >= settings.goals.weight.end) {
    return true;
  } else if (
    overallGoal === 'lose' &&
    entry.value <= settings.goals.weight.end
  ) {
    return true;
  } else {
    return false;
  }
};

export const isNewEntryRecord = (
  entry: Entry,
  allEntries: Entry[],
  settings: Settings,
): boolean => {
  if (getOverallWeightGoal(settings) === 'lose') {
    const minWeight = getMinValue(allEntries.map(e => e.value));
    return entry.value < minWeight;
  } else {
    const maxWeight = getMinValue(allEntries.map(e => e.value));
    return entry.value > maxWeight;
  }
};

export const isGoalNewRecord = (
  entry: Entry,
  allEntries: Entry[],
  settings: Settings,
): boolean => {
  if (!settings.goals.weight) {
    return false;
  }

  return (
    isAtOrPastWeightGoal(entry, settings) &&
    isNewEntryRecord(entry, allEntries, settings) &&
    !allEntries.some(
      e => e.id !== entry.id && isAtOrPastWeightGoal(e, settings),
    )
  );
};
