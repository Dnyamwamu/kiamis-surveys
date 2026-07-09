import * as d3 from 'd3';
import { geoRobinson } from 'd3-geo-projection';

export const mapProjections = {
  geoRobinson: geoRobinson,
  equirectangular: d3.geoEquirectangular,
};

export type MapProjectionType = keyof typeof mapProjections;
