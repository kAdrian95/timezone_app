import { useRef, type PointerEvent } from "react";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import styles from "./AnalogClock.module.css";
import { pointerToHourFrac } from "../utils/dragMath";

interface Props {
  time: Date;
  size: number;
  label: string;
  onHourDrag?: (hourFrac: number) => void;
}

export function AnalogClock({ time, size, label, onHourDrag }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const interactive = Boolean(onHourDrag);

  const labelSizeClass = size > 180 ? styles.labelLarge : styles.labelSmall;
  const labelStateClass = interactive
    ? styles.labelInteractive
    : styles.labelStatic;

  function reportAngle(e: PointerEvent<HTMLDivElement>) {
    if (!onHourDrag || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    onHourDrag(pointerToHourFrac(e.clientX, e.clientY, rect));
  }

  function handlePointerDown(e: PointerEvent<HTMLDivElement>) {
    const { currentTarget, pointerId } = e;
    e.preventDefault();

    currentTarget.setPointerCapture(pointerId);
    reportAngle(e);
  }

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    const { currentTarget, pointerId } = e;

    if (!currentTarget.hasPointerCapture(pointerId)) return;
    reportAngle(e);
  }

  function handlePointerEnd(e: PointerEvent<HTMLDivElement>) {
    const { currentTarget, pointerId } = e;

    if (currentTarget.hasPointerCapture(pointerId)) {
      reportAngle(e);
      currentTarget.releasePointerCapture(pointerId);
    }
  }

  return (
    <div className={styles.root}>
      <div ref={containerRef} className={styles.clockWrapper}>
        <Clock value={time} size={size} />

        {interactive && (
          <div
            className={styles.dragOverlay}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
          />
        )}
      </div>

      <div className={`${styles.label} ${labelSizeClass} ${labelStateClass}`}>
        {label}
      </div>
    </div>
  );
}
