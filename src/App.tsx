import { useEffect, useState } from "react";
import { AnalogClockLib as AnalogClock } from "./components/AnalogClockLib";
import { TimezoneMap } from "./components/TimezoneMap";

import { useTimezoneData } from "./hooks/useTimezoneData";
import { getTimeForOffset } from "./utils/timezone";
import styles from "./App.module.css";
import { useMainTimeOffsetDrag } from "./hooks/useMainTimeOffsetDrag";

export default function App() {
  const [now, setNow] = useState(new Date());
  const [selectedOffset, setSelectedOffset] = useState(
    () => -new Date().getTimezoneOffset() / 60,
  );
  const mainTime = getTimeForOffset(now, selectedOffset);
  const prevTime = getTimeForOffset(now, selectedOffset - 1);
  const nextTime = getTimeForOffset(now, selectedOffset + 1);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const { mapFeatures } = useTimezoneData();
  const handleHourDrag = useMainTimeOffsetDrag(mainTime, setSelectedOffset);

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>World Clock</h1>
      <p className={styles.subtitle}>
        Przeciągnij wskazówkę godzinową lub kliknij strefę na mapie
      </p>

      <div className={styles.clocksPanel}>
        <AnalogClock time={prevTime} size={140} label="-1h" />
        <AnalogClock
          time={mainTime}
          size={280}
          label={`UTC ${selectedOffset >= 0 ? "+" : ""}${selectedOffset}`}
          onHourDrag={handleHourDrag}
        />
        <AnalogClock time={nextTime} size={140} label="+1h" />
      </div>

      <TimezoneMap
        features={mapFeatures}
        selectedOffset={selectedOffset}
        onZoneClick={setSelectedOffset}
      />

      <p className={styles.activeZone}>
        Aktywna strefa:{" "}
        <strong>
          UTC {selectedOffset >= 0 ? "+" : ""}
          {selectedOffset}
        </strong>
      </p>
    </div>
  );
}
