import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import type { TzMapFeature } from "../types/timezoneMap";
import styles from "./TimezoneMap.module.css";

interface Props {
  features: TzMapFeature[];
  selectedOffset: number;
  onZoneClick: (offset: number) => void;
}

export function TimezoneMap({ features, selectedOffset, onZoneClick }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.map}>
        <ComposableMap
          projection="geoEqualEarth"
          projectionConfig={{ scale: 180 }}
          width={1100}
          height={520}
        >
          <Geographies geography={{ type: "FeatureCollection", features }}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const { utcOffsetHours } = geo.properties;
                const active =
                  Math.abs(utcOffsetHours - selectedOffset) < 0.001;

                return (
                  <g
                    key={geo.rsmKey}
                    className={styles.zone}
                    data-active={active}
                    onClick={() => onZoneClick(utcOffsetHours)}
                  >
                    <Geography geography={geo} />
                  </g>
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>
    </div>
  );
}
