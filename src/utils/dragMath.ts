const MIN_OFFSET = -12;
const MAX_OFFSET = 14;
const DEG_PER_HOUR = 30;

export function clampUtcOffset(hours: number) {
  return Math.max(MIN_OFFSET, Math.min(MAX_OFFSET, hours));
}

export function unwrapHourDelta(prevHourFrac: number, nextHourFrac: number) {
  let delta = nextHourFrac - prevHourFrac;
  if (delta > 6) delta -= 12;
  if (delta < -6) delta += 12;

  return delta;
}

export function dateToHourFrac(date: Date) {
  return (date.getHours() % 12) + date.getMinutes() / 60;
}

export function pointerToHourFrac(
  clientX: number,
  clientY: number,
  rect: DOMRect,
) {
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const deg = Math.atan2(clientY - cy, clientX - cx) * (180 / Math.PI) + 90;

  const normalizedDeg = deg < 0 ? deg + 360 : deg;

  return normalizedDeg / DEG_PER_HOUR;
}
