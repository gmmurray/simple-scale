export const roundToOneDecimal = (value: number) => Math.round(value * 10) / 10;

export const getMinValue = (values: number[]) =>
  values.reduce((prev, curr) => (prev < curr ? prev : curr));
