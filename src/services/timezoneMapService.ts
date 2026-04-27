import type { TimezoneMapResponse } from "../types/timezoneMap";

export async function fetchTimezoneMapJson(): Promise<TimezoneMapResponse> {
  const response = await fetch(
    "https://raw.githubusercontent.com/jeongsd/react-timezone-map-gl/master/src/data/timezoneTopo.json",
  );

  return response.json();
}
