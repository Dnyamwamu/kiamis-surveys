import { useMemo } from 'react';
import useSWR from 'swr';
import * as topojson from 'topojson-client';
import { GeometryObject } from 'topojson-specification';

import { fetcher } from '../utils/fetcher';

const ignoredCountries = ['Antarctica'];

export interface TopologyData {
  type: 'Topology';
  arcs: number[][][];
  objects: Record<string, GeometryObject<{ name: string }>>;
}

export const formatGEOJSON = (
  topologyData: TopologyData,
  geometryCollectionName: string,
) => {
  return {
    type: 'FeatureCollection',
    features: (
      topojson.feature(
        topologyData,
        topologyData.objects[geometryCollectionName],
      ) as GeoJSON.FeatureCollection
    ).features.filter((f) => !ignoredCountries.includes(f.properties?.name)),
  } as GeoJSON.FeatureCollection;
};

export const useTopology = (
  topoJSONURL: string,
): {
  areas: GeoJSON.FeatureCollection;
  borders: GeoJSON.FeatureCollection;
  water?: GeoJSON.FeatureCollection;
} | null => {
  const { data } = useSWR(topoJSONURL, fetcher);

  const topology = useMemo(() => {
    if (data == null) {
      return null;
    }

    const collectionNames = Object.keys(data.objects);

    if (
      collectionNames.includes('areas') &&
      collectionNames.includes('borders')
    ) {
      return {
        areas: formatGEOJSON(data, 'areas'),
        borders: formatGEOJSON(data, 'borders'),
        water: collectionNames.includes('water')
          ? formatGEOJSON(data, 'water')
          : undefined,
      };
    }

    const formatted = formatGEOJSON(data, collectionNames[0]);
    return { areas: formatted, borders: formatted };
  }, [data]);

  return topology;
};
