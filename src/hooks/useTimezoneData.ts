import { useEffect, useMemo, useState } from "react";
import { feature as topoFeature } from "topojson-client";
import type { RawTzFeature, TzMapFeature } from "../types/timezoneMap";
import { fetchTimezoneMapJson } from "../services/timezoneMapService";
import { getOffsetForTzid } from "../utils/timezone";

export function useTimezoneData() {
  const [rawFeatures, setRawFeatures] = useState<RawTzFeature[]>([]);

  useEffect(() => {
    fetchTimezoneMapJson()
      .then((topology) => {
        const collection = topoFeature(
          topology.timezoneBoundaryBuilder,
          topology.timezoneBoundaryBuilder.objects.combined_shapefile,
        );

        setRawFeatures(collection.features);
      })
      .catch(console.error);
  }, []);

  const mapFeatures = useMemo(() => {
    const offsetCache: Record<string, number> = {};
    const now = new Date();

    return rawFeatures.map<TzMapFeature>((f) => {
      const tzid = f.properties.tzid;

      if (tzid && offsetCache[tzid] === undefined) {
        try {
          offsetCache[tzid] = getOffsetForTzid(tzid, now);
        } catch {
          offsetCache[tzid] = 0;
        }
      }

      return {
        ...f,
        properties: {
          ...f.properties,
          utcOffsetHours: offsetCache[tzid],
        },
      };
    });
  }, [rawFeatures]);

  return { mapFeatures };
}
