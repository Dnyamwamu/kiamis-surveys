import * as d3 from 'd3';

export const mapProjections = {
  geoMercator: d3.geoMercator,
  equirectangular: d3.geoEquirectangular,
};

export type MapProjectionType = keyof typeof mapProjections;
