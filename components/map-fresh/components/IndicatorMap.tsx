'use client';

import styles from './IndicatorMap.module.css';

import React, { useCallback, useDeferredValue, useMemo } from 'react';
import { useAtomValue } from 'jotai';

import { Indicator, Subsector, ViewMode } from '../types';
import { DataMap, MapData } from './DataMap';
import { NumericalLegend } from './NumericalLegend';
import { OrdinalLegend } from './OrdinalLegend';
import { indicatorColorScale } from '../utils/indicatorColorScale';
import { useTopology } from './topologyData';
import { LoadingOverlay } from './LoadingOverlay';
import { useIndicatorYears } from './IndicatorYearsContainer';
import { mapSettingsState } from '../state/atoms';
import { IndicatorLayout } from './IndicatorLayout';
import { IndicatorContextBar } from './IndicatorContextBar';
import { formatValue } from '../utils/formatValue';
import { regionLevelFromSlug, AdminLevelSlug } from '../utils/regionLevelFromSlug';

interface Props {
  topoJSONURL?: string;
  indicator: Indicator | null;
  subsector: Subsector | null;
  // Mapped region values, key is region alpha3Code (lowercase) or name
  data?: Record<string, { value: string | number; startYear: number; endYear: number }[]>;
  regions?: { id: number; name: string; alpha3Code: string | null }[];
  linkedRegions?: Record<string, string>;
  countryAlpha3Code?: string;
  adminLevel?: string;
  countryId?: number;
  localizations?: { name: string; languageCode: string }[];
  menu?: React.ReactNode;
  filters?: React.ReactNode;
  timeline?: React.ReactNode;
  mapLevels?: Record<string, string>;
  hideViewToggles?: boolean;
  onViewChange?: (view: ViewMode) => void;
}

export const IndicatorMap: React.FC<Props> = (props) => {
  const {
    topoJSONURL,
    indicator,
    subsector,
    data = {},
    regions = [],
    linkedRegions,
    countryId,
    // countryAlpha3Code,
    adminLevel,
    // localizations = [],
    menu,
    filters,
    timeline,
    mapLevels,
    hideViewToggles,
    onViewChange,
  } = props;

  const { selectedYearRange } = useIndicatorYears();
  const mapSettings = useAtomValue(mapSettingsState);
  const latestDataVisible = useDeferredValue(mapSettings.latestDataVisible);

  const activeLevel = adminLevel ? regionLevelFromSlug(adminLevel as AdminLevelSlug) : undefined;

  // Extract correct datum for a specific region based on year range selection
  const datumForRegion = useCallback(
    (regionKey: string) => {
      if (!regionKey) return null;
      const values = data[regionKey.toUpperCase()] ?? data[regionKey.toLowerCase()] ?? data[regionKey] ?? [];
      if (values.length === 0) return null;

      const year = selectedYearRange[0];

      if (latestDataVisible) {
        // Find latest available data up to selected year
        const filtered = values.filter((datum) => datum.startYear <= year);
        if (filtered.length === 0) return null;
        return filtered.reduce((max, d) => (d.startYear > max.startYear ? d : max), filtered[0]);
      } else {
        // Find data matching current active year
        return values.find((datum) => datum.startYear <= year && datum.endYear >= year) ?? null;
      }
    },
    [data, selectedYearRange, latestDataVisible],
  );

  const { mapData, regionNamesByKey, colorScale, minValue, maxValue } =
    useMemo(() => {
      if (!indicator || regions.length === 0) {
        return {
          colorScale: () => '#879099',
          minValue: null,
          maxValue: null,
          mapData: {},
          regionNamesByKey: {},
        };
      }

      // Collect all numeric values across regions to generate color bounds
      const allValues: (string | number)[] = [];
      regions.forEach((region) => {
        if (!region?.name) return;
        const key = region.name.toUpperCase();
        const d = datumForRegion(key);
        if (d != null && d.value != null) {
          allValues.push(d.value);
        }
      });

      const ordinalValues = indicator.ordinalSetId != null && indicator.sources
        ? indicator.ordinalValues || []
        : [];

      const scale = indicatorColorScale(
        ordinalValues,
        allValues,
        subsector?.sector,
      );

      const regionNamesByKey = regions.reduce(
        (result, region) => {
          if (region?.name) {
            result[region.name.toUpperCase()] = region.name;
          }
          return result;
        },
        {} as Record<string, string>,
      );

      const mapData = regions.reduce(
        (result, region) => {
          if (!region?.name) return result;
          const key = region.name.toUpperCase();
          const datum = datumForRegion(key);

          if (adminLevel === 'national') {
            // High-level default availability color
            const defaultColor = '#018d73';
            result[key] = {
              value: null,
              color: defaultColor,
              startYear: 0,
              endYear: 0,
            };
          } else if (datum) {
            result[key] = {
              ...datum,
              color: scale.colorScale(datum.value),
            };
          }

          return result;
        },
        {} as MapData<{ value: string | number | null; color: string; startYear: number; endYear: number }>,
      );

      return { ...scale, regionNamesByKey, mapData };
    }, [
      datumForRegion,
      indicator,
      regions,
      subsector?.sector,
      adminLevel,
    ]);

  const topology = useTopology();

  const ordinalValues = indicator?.ordinalSetId != null
    ? indicator.ordinalValues || []
    : [];

  const items = indicator?.items?.map((item: string) => ({ id: item, name: item })) || [];

  return (
    <IndicatorLayout
      indicator={indicator}
      subsector={subsector}
      menu={menu}
      filters={filters}
      timeline={timeline}
      contextBar={
        <IndicatorContextBar
          indicator={indicator}
          subsector={subsector}
          countryId={countryId}
          regionLevel={activeLevel}
          items={items}
          mapLevels={mapLevels}
          hideViewToggles={hideViewToggles}
          onViewChange={onViewChange}
        />
      }
      content={
        <div className={styles.map}>
          {topology != null && (
            <DataMap
              topology={topology}
              data={mapData}
              tooltipContents={(regionKey, datum) => {
                const regionName = regionNamesByKey[regionKey.toUpperCase()];
                if (regionName == null) return null;
                if (datum == null) {
                  return `${regionName} – No Data Available`;
                }

                return (
                  <div>
                    <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>
                      {`${regionName} – ${formatValue(datum.value, { unit: indicator?.unit, significantFigures: indicator?.significantFigures })}`}
                    </div>
                    <div style={{ fontSize: '0.85em', color: '#64748b' }}>
                      {datum.startYear === datum.endYear
                        ? datum.startYear
                        : `${datum.startYear} - ${datum.endYear}`}
                    </div>
                  </div>
                );
              }}
              unit={indicator?.unit}
              significantFigures={indicator?.significantFigures}
              linkedRegions={linkedRegions}
            />
          )}

          {indicator != null && (
            <div className={styles.metaInfo}>
              {ordinalValues.length > 0 ? (
                <OrdinalLegend
                  indicator={indicator}
                  ordinalValues={ordinalValues}
                  colorScale={colorScale}
                />
              ) : (
                <NumericalLegend
                  indicator={indicator}
                  minValue={minValue}
                  maxValue={maxValue}
                  colorScale={colorScale}
                />
              )}
            </div>
          )}

          {topology == null && (
            <div className={styles.loadingOverlay}>
              <LoadingOverlay />
            </div>
          )}
        </div>
      }
    />
  );
};
