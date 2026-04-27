import type { Geometry } from "geojson";
import type {
  GeometryCollection as TopoGeometryCollection,
  Objects,
  Topology,
} from "topojson-specification";

interface TzBaseProperties {
  tzid: string;
}

interface BaseTzFeature {
  type: "Feature";
  geometry: Geometry | null;
}

export interface RawTzFeature extends BaseTzFeature {
  properties: TzBaseProperties;
}

export interface TzMapProperties extends TzBaseProperties {
  utcOffsetHours: number;
}

export interface TzMapFeature extends BaseTzFeature {
  properties: TzMapProperties;
}

export type TimezoneTopologyObjects = Objects<{ tzid: string }> & {
  combined_shapefile: TopoGeometryCollection<{ tzid: string }>;
};

export interface TimezoneMapResponse {
  timezoneBoundaryBuilder: Topology<TimezoneTopologyObjects>;
}
