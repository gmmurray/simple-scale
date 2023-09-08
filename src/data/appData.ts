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

  const diff = current.value - previous.value;

  return {
    diff,
    desirable: diff < 0,
  };
};

export const unitLabelMap: Record<Entry['unit'], string> = {
  lbs: 'lbs',
};
