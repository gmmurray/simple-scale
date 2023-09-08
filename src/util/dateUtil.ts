import dayjs, { Dayjs } from 'dayjs';

import LocaleData from 'dayjs/plugin/LocaleData';
import isBetween from 'dayjs/plugin/isBetween';
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(weekday);
dayjs.extend(isBetween);
dayjs.extend(LocaleData);

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

export const getThisWeekDateRange = () => {
  const start = dayjs().weekday(0).toDate();
  const end = dayjs().weekday(6).toDate();

  return {
    start,
    end,
  };
};

export const isDateBetweenDatesInclusive = (
  date: Date,
  start: Date,
  end: Date,
): boolean => {
  return dayjs(date).isBetween(start, end, 'date', '[]');
};

export const isSameMonthThisYear = (
  monthIndex: number,
  date: Date,
): boolean => {
  const today = dayjs();
  const queryDate = dayjs(date);
  return queryDate.month() === monthIndex && queryDate.year() === today.year();
};

export const getWeekdayName = (index: number) => dayjs.weekdaysMin()[index];
