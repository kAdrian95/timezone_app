import { DateTime } from "luxon";

export function getOffsetForTzid(tzid: string, date: Date) {
  const dt = DateTime.fromJSDate(date, { zone: tzid });
  if (!dt.isValid) return 0;

  return dt.offset / 60;
}

export function getTimeForOffset(now: Date, targetOffset: number) {
  const localOffset = -now.getTimezoneOffset() / 60;
  const diff = targetOffset - localOffset;

  return new Date(now.getTime() + diff * 3_600_000);
}
