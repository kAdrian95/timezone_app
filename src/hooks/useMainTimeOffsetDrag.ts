import {
  useCallback,
  useEffect,
  useRef,
  type Dispatch,
  type SetStateAction,
} from "react";
import {
  clampUtcOffset,
  dateToHourFrac,
  unwrapHourDelta,
} from "../utils/dragMath";

export function useMainTimeOffsetDrag(
  mainTime: Date,
  setOffset: Dispatch<SetStateAction<number>>,
) {
  const mainTimeRef = useRef(mainTime);

  useEffect(() => {
    mainTimeRef.current = mainTime;
  }, [mainTime]);

  return useCallback(
    (hourFromPointer: number) => {
      setOffset((prevOffset) => {
        const currentHourFrac = dateToHourFrac(mainTimeRef.current);
        const delta = unwrapHourDelta(currentHourFrac, hourFromPointer);

        const nextOffset = clampUtcOffset(Math.round(prevOffset + delta));
        return nextOffset;
      });
    },
    [setOffset],
  );
}
