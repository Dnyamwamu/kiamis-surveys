import { sortBy } from 'lodash';

export function interQuartileRange(
  values: number[],
): [number, number] | [null, null] {
  const sortedValues = sortBy(values, (v) => v);

  if (values.length < 1) {
    return [null, null];
  }

  if (values.length < 20) {
    return [sortedValues[0], sortedValues[sortedValues.length - 1]];
  }

  const q1 = sortedValues[Math.round(values.length * 0.25)];
  const q3 = sortedValues[Math.round(values.length * 0.75)];

  const interQuartileRange = q3 - q1;

  return [
    Math.max(q1 - 1.5 * interQuartileRange, sortedValues[0]),
    Math.min(
      q3 + 1.5 * interQuartileRange,
      sortedValues[sortedValues.length - 1],
    ),
  ];
}
