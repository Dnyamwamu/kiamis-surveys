import { useMemo } from 'react';
import * as topojson from 'topojson-client';
import countyData from "@/lib/data/kenya-counties";

export const formatGEOJSON = (
  topologyData: unknown,
  geometryCollectionName: string,
) => {
  const topo = topologyData as Parameters<typeof topojson.feature>[0];
  const objects = (topo as { objects: Record<string, unknown> }).objects;
  const geom = objects[geometryCollectionName] as Parameters<typeof topojson.feature>[1];
  return topojson.feature(topo, geom) as unknown as GeoJSON.FeatureCollection;
};

export const useTopology = () => {
  const topology = useMemo(() => {
    const formatted = formatGEOJSON(countyData, 'County');
    return { areas: formatted, borders: formatted };
  }, []);

  return topology;
};
