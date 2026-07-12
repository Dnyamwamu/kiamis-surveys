'use client';

import styles from './DataMap.module.css';

import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Measure from 'react-measure';
import classNames from 'classnames';
import * as d3 from 'd3';

import { useAnimationFrameThrottle } from '../utils/useAnimationFrameThrottle';
import { Tooltip } from './Tooltip';
import { formatValue } from '../utils/formatValue';
import { mapProjections, MapProjectionType } from './MapProjections';

// Inline base64 SVG pattern to avoid relying on complex Next.js/Webpack SVG file loaders
const noDataPattern = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfMjMzXzgwODkpIj48cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9IndoaXRlIi8+PHBhdGggZD0iTS01MyA3NUw3NSAtNTMiIHN0cm9rZT0iI0E0QTRBNCIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTS02MSA2N0w2NyAtNjEiIHN0cm9rZT0iI0E0QTRBNCIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjxkZWZzPjxjbGlwUGF0aCBpZD0iY2xpcDBfMjMzXzgwODkpIj48cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9IndoaXRlIi8+PC9jbGlwUGF0aD48L2RlZnM+PC9zdmc+";

interface MapDatum {
  value: string | number | null;
  color: string | null;
}

export type MapData<T extends MapDatum> = Record<string, T>;

interface Props<T extends MapDatum> {
  topology: {
    areas: GeoJSON.FeatureCollection;
    borders: GeoJSON.FeatureCollection;
    water?: GeoJSON.FeatureCollection;
  };
  data: MapData<T>;
  tooltipContents?(regionName: string, datum: T | undefined): React.ReactNode;
  unit?: string | null;
  significantFigures?: number | null;
  linkedRegions?: Record<string, string>;
  projectionType?: MapProjectionType;
  onRegionClick?(regionName: string): void;
  padding?: number;
}

export const DataMap = <T extends MapDatum>(props: Props<T>) => {
  const {
    topology,
    data,
    tooltipContents,
    unit,
    significantFigures,
    linkedRegions,
    projectionType = 'geoMercator',
    onRegionClick,
    padding = 15,
  } = props;

  const router = useRouter();

  const svgRef = useRef<SVGSVGElement>(null);
  const [group, setGroup] = useState<d3.Selection<
    SVGGElement,
    unknown,
    null,
    undefined
  > | null>(null);

  const [width, setWidth] = useState<number | undefined>(undefined);
  const [height, setHeight] = useState<number | undefined>(undefined);

  const [zoomTransform, setZoomTransform] = useState(d3.zoomIdentity);
  const throttledZoomTransform = useAnimationFrameThrottle(zoomTransform);

  const zoom = useMemo(() => {
    return d3.zoom<SVGSVGElement, unknown>().scaleExtent([0.5, 6]);
  }, []);

  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const path = useMemo(() => {
    if (width == null || height == null) {
      return null;
    }

    const projection = mapProjections[projectionType]().fitExtent(
      [
        [padding, padding],
        [width - padding, height - padding],
      ],
      topology.areas,
    );

    return d3.geoPath().projection(projection);
  }, [topology, height, width, projectionType, padding]);

  // Set up Zoom
  useLayoutEffect(() => {
    if (!svgRef.current) {
      return;
    }

    const svg = d3.select(svgRef.current);

    const handleZoom = (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
      setZoomTransform(event.transform);
    };

    svg.call(zoom);

    zoom.on('zoom', handleZoom);

    return () => {
      zoom.on('zoom', null);
    };
  }, [zoom]);

  // Build Map SVG
  useLayoutEffect(() => {
    if (!svgRef.current || !path) {
      return;
    }

    const svg = d3.select(svgRef.current);

    const group = svg.append('g');

    const areasGroup = group.append('g');
    areasGroup
      .selectAll('path')
      .data(topology.areas.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('class', styles.polygon)
      .style('fill', (d) => {
        const attributes = data[keyForRegion(d.properties)];
        return attributes == null ? 'url(#img1)' : attributes.color;
      })
      .on('mouseenter', (event, d) =>
        setHoveredRegion(keyForRegion(d.properties)),
      )
      .on('mouseleave', () => setHoveredRegion(null))
      .on('click', (event, d) => {
        const regionKey = keyForRegion(d.properties);
        if (onRegionClick != null) {
          onRegionClick(regionKey);
        } else {
          const link = linkedRegions?.[regionKey];
          if (link != null) {
            router.push(link);
          }
        }
      });

    const bordersGroup = group.append('g');
    bordersGroup
      .selectAll('path')
      .data(topology.borders.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('class', (d) => {
        return classNames(styles.border, {
          [styles[`borderType${d.properties?.['type']}`]]:
            d.properties?.['type'] != null,
        });
      });

    if (topology.water != null) {
      const waterGroup = group.append('g');
      waterGroup
        .selectAll('path')
        .data(topology.water.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('class', () => {
          return classNames(styles.border, styles.waterArea);
        });
    }

    setGroup(group);

    return () => {
      group.remove();
    };
  }, [height, path, data, width, zoom, topology, linkedRegions, router, onRegionClick]);

  // Apply Zoom
  useLayoutEffect(() => {
    if (group) {
      group
        .attr('transform', throttledZoomTransform.toString())
        .style('stroke-width', `${1 / throttledZoomTransform.k}px`);
    }
  }, [group, throttledZoomTransform]);

  const resetZoom = useCallback(() => {
    if (!svgRef.current) {
      return;
    }

    d3.select(svgRef.current)
      .transition()
      .duration(250)
      .call(zoom.transform, d3.zoomIdentity);
  }, [zoom.transform]);

  const getTooltipLabel = useCallback(
    (regionName: string) => {
      const regionData = data?.[regionName];

      if (tooltipContents != null) {
        return tooltipContents(regionName, regionData);
      }

      return regionData
        ? `${regionName} – ${formatValue(regionData.value, { unit, significantFigures })}`
        : `${regionName} – No Data Available`;
    },
    [data, tooltipContents, unit, significantFigures],
  );

  return (
    <Measure
      bounds
      onResize={(contentRect) => {
        setWidth(contentRect.bounds?.width);
        setHeight(contentRect.bounds?.height);
      }}
    >
      {({ measureRef }) => (
        <div ref={measureRef} className={styles.container}>
          <svg
            className={styles.svg}
            ref={svgRef}
            width={width}
            height={height}
          >
            <defs>
              <pattern
                id="img1"
                patternUnits="userSpaceOnUse"
                width={6 / zoomTransform.k}
                height={6 / zoomTransform.k}
              >
                <image
                  href={noDataPattern}
                  x="0"
                  y="0"
                  width={6 / zoomTransform.k}
                  height={6 / zoomTransform.k}
                />
              </pattern>
            </defs>
          </svg>

          <button className={styles.resetZoom} onClick={resetZoom}>
            Reset Zoom
          </button>

          {hoveredRegion && getTooltipLabel(hoveredRegion) != null && (
            <Tooltip color={data?.[hoveredRegion]?.color}>
              {getTooltipLabel(hoveredRegion)}
            </Tooltip>
          )}
        </div>
      )}
    </Measure>
  );
};

function keyForRegion(
  region?: Record<string, unknown> | null,
) {
  if (region == null) {
    return '';
  }
  if (region['COUNTY'] != null) {
    return String(region['COUNTY']).toUpperCase();
  }
  if (region['code'] != null) {
    return String(region['code']).toUpperCase();
  }
  if (region['name'] != null) {
    return String(region['name']).toUpperCase();
  }

  return String(region['shapeName'] ?? '').toUpperCase();
}
