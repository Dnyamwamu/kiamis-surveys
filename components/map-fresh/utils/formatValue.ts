const INTEGER_FORMAT = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0,
});

interface Magnitude {
  multiple: number;
  abbreviation: string;
}

const MAGNITUDES: Magnitude[] = [
  {
    multiple: 1_000_000_000_000,
    abbreviation: 'T',
  },
  {
    multiple: 1_000_000_000,
    abbreviation: 'B',
  },
  {
    multiple: 1_000_000,
    abbreviation: 'M',
  },
  {
    multiple: 1_000,
    abbreviation: 'K',
  },
];

interface Options {
  abbreviate?: boolean;
  unit?: string | null;
  excludeUnit?: boolean;
  significantFigures?: number | null;
}

export function formatValue(value: number | string, options?: Options): string;
export function formatValue(value: null | undefined, options?: Options): null;
export function formatValue(
  value: number | string | null | undefined,
  options?: Options,
): string | null;

export function formatValue(
  value: number | string | null | undefined,
  options: Options = {},
) {
  const { abbreviate = false, unit, excludeUnit = false } = options;
  const significantFigures = options.significantFigures ?? 1;

  if (typeof value === 'number') {
    let formattedValue: string;

    const format = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: significantFigures,
    });

    if (abbreviate) {
      const magnitude = MAGNITUDES.find(
        ({ multiple }) => Math.abs(value / multiple) >= 1,
      );

      if (magnitude != null) {
        formattedValue = format.format(value / magnitude.multiple);

        formattedValue += magnitude.abbreviation;
      } else {
        formattedValue = format.format(value);
      }
    } else if (unit != null && /^%/.test(unit)) {
      formattedValue = INTEGER_FORMAT.format(value);
    } else {
      formattedValue = format.format(value);
    }

    if (unit == null || excludeUnit) {
      return formattedValue;
    }

    if (/^%/.test(unit)) {
      return `${formattedValue}${unit}`;
    }

    return `${formattedValue} ${unit}`;
  }

  return value;
}
