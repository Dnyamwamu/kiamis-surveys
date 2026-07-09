import * as d3 from 'd3';
import { clamp, compact } from 'lodash';

import { Sector } from '../types';
import { interQuartileRange } from './interQuartileRange';

type ColorScale = (value: number | string) => string;

const secondaryColors: Record<string, string> = {
  drivers: '#394082',
  'food-supply-chains': '#105D6D',
  'food-environments': '#462C8E',
  'individual-factors': '#8D1C59',
  'cross-cutting-issues': '#1F1A82',
  outcomes: '#394082',
};

function keyPoints(extent: [number, number], count: number): number[] {
  return Array.from(Array(count).keys()).map((t) => {
    return extent[0] * (1 - t / (count - 1)) + extent[1] * (t / (count - 1));
  });
}

export function indicatorColorScale(
  ordinalValues: {
    position: number;
    label: string;
  }[],
  data: (string | number)[],
  sector: Sector | undefined,
): {
  colorScale: ColorScale;
  minValue: number | null;
  maxValue: number | null;
} {
  if (ordinalValues.length > 0) {
    const scale = d3
      .scaleLinear<string>()
      .domain([0, ordinalValues.length - 1])
      .range(['#ffffff', sector?.color ?? '#000000']);

    return {
      colorScale: ((value: string) => {
        const position = ordinalValues.find(
          (ordinalValue) => ordinalValue.label === value,
        )?.position;

        if (position == null) {
          return () => '#000000';
        }

        return scale(position);
      }) as ColorScale,
      minValue: null,
      maxValue: null,
    };
  }

  const colors = compact([
    '#ffffff',
    sector?.color ?? '#000000',
    sector?.slug ? secondaryColors[sector.slug] : null,
  ]);

  const extent = interQuartileRange(data as number[]);

  if (extent[0] == null) {
    return {
      colorScale: d3
        .scaleLinear<string>()
        .domain([0, 100])
        .range(['#ffffff', '#ffffff']) as ColorScale,
      minValue: 0,
      maxValue: 100,
    };
  }

  const scale = d3
    .scaleLinear<string>()
    .domain(keyPoints(extent, colors.length))
    .range(colors) as ColorScale;

  return {
    colorScale: ((value) => {
      return scale(clamp(value as number, extent[0], extent[1]));
    }) as ColorScale,
    minValue: extent[0],
    maxValue: extent[1],
  };
}
