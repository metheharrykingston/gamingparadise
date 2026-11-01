// Pixel Paradise operates every day, 10:00 to 22:00 India time.
// These are requestable start times, NOT proof of live station availability.
export const CAFE_OPEN_MINUTES = 10 * 60;
export const CAFE_CLOSE_MINUTES = 22 * 60;
export const CAFE_SLOT_INTERVAL_MINUTES = 30;
export const CAFE_SESSION_DURATIONS = [30, 60, 120];

export function cafeIndiaNow(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hourCycle: "h23"
  }).formatToParts(now);
  const p = Object.fromEntries(parts.map(part => [part.type, part.value]));
  return {
    date: p.year + "-" + p.month + "-" + p.day,
    minutes: Number(p.hour) * 60 + Number(p.minute)
  };
}

export function cafeBookingSlots(duration, date, now = new Date()) {
  const length = Number(duration);
  if (!CAFE_SESSION_DURATIONS.includes(length)) return [];
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date || "")) return [];
  const today = cafeIndiaNow(now);
  if (date < today.date) return [];
  // Validate the actual calendar day, not only the input's shape.
  const parsed = new Date(date + "T00:00:00.000Z");
  if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) return [];

  const slots = [];
  for (let minute = CAFE_OPEN_MINUTES; minute + length <= CAFE_CLOSE_MINUTES; minute += CAFE_SLOT_INTERVAL_MINUTES) {
    if (date === today.date && minute <= today.minutes) continue;
    const hour = String(Math.floor(minute / 60)).padStart(2, "0");
    const min = String(minute % 60).padStart(2, "0");
    slots.push(hour + ":" + min);
  }
  return slots;
}

export function isCafeBookingSlot(duration, date, time, now = new Date()) {
  return cafeBookingSlots(duration, date, now).includes(time);
}
