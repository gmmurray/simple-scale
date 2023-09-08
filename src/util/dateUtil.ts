import dayjs, { Dayjs } from 'dayjs';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const getMonthIndices = () => [...Array(12)].map((_, index) => index);

type NameVariant = 'abbrev' | 'full';

export const getMonthByName = (key: number, variant: NameVariant): string => {
  const format = variant === 'abbrev' ? 'MMM' : 'MMMM';
  return dayjs().month(key).format(format);
};

export const isThisCalendarYear = (date: unknown): boolean => {
  const currentYear = dayjs().year();
  return dayjs(date as Dayjs).year() === currentYear;
};
