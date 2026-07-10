import { useMemo } from 'react';
import * as topojson from 'topojson-client';
import countyData from "@/lib/data/kenya-counties";

export const formatGEOJSON = (
  topologyData: any,
  geometryCollectionName: string,
) => {
  return {
    type: 'FeatureCollection',
    features: (
      topojson.feature(
        topologyData,
        topologyData.objects[geometryCollectionName] as any,
      ) as any
    ).features,
  } as any;
};

export const useTopology = (topoJSONURL?: string) => {
  const topology = useMemo(() => {
    const formatted = formatGEOJSON(countyData, 'County');
    return { areas: formatted, borders: formatted };
  }, []);

  return topology;
};
