// GTA VI launch date is from Rockstar Games. This is a café slot-enquiry calendar,
// not a game preorder, live inventory feed, or promise of early access.
export const GTA6_RELEASE_DATE = "2026-11-19";
export const GTA6_COUNTDOWN_TARGET = "2026-11-18T18:30:00.000Z"; // Nov 19, 00:00 IST; date marker only
export const GTA6_BOOKING_WINDOW_DAYS = 30;

export function indiaNow(date = new Date()) {
  const pieces = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hourCycle: "h23"
  }).formatToParts(date);
  const p = Object.fromEntries(pieces.map(item => [item.type, item.value]));
  return { date: p.year + "-" + p.month + "-" + p.day, minutes: Number(p.hour) * 60 + Number(p.minute) };
}

export function earliestGta6Date(now = new Date()) {
  const today = indiaNow(now).date;
  return today > GTA6_RELEASE_DATE ? today : GTA6_RELEASE_DATE;
}

export function lastGta6Date(now = new Date()) {
  const start = earliestGta6Date(now);
  const day = new Date(start + "T00:00:00.000Z");
  day.setUTCDate(day.getUTCDate() + GTA6_BOOKING_WINDOW_DAYS - 1);
  return day.toISOString().slice(0, 10);
}

export function gta6Countdown(now = new Date()) {
  const secondsLeft = Math.max(0, Math.ceil((Date.parse(GTA6_COUNTDOWN_TARGET) - now.getTime()) / 1000));
  return {
    days: Math.floor(secondsLeft / 86400),
    hours: Math.floor(secondsLeft % 86400 / 3600),
    minutes: Math.floor(secondsLeft % 3600 / 60),
    seconds: secondsLeft % 60,
    reached: secondsLeft === 0
  };
}

export function gta6Slots(duration = 60, date = "", now = new Date()) {
  if (![60, 120].includes(Number(duration))) return [];
  const today = indiaNow(now);
  const slots = [];
  for (let minute = 600; minute + Number(duration) <= 1320; minute += 30) {
    if (date === today.date && minute <= today.minutes) continue;
    const h = String(Math.floor(minute / 60)).padStart(2, "0");
    const m = String(minute % 60).padStart(2, "0");
    slots.push(h + ":" + m);
  }
  return slots;
}

export function formatSlotTime(value) {
  if (!/^\d{2}:\d{2}$/.test(value)) return value;
  const [h, m] = value.split(":").map(Number);
  return (h % 12 || 12) + ":" + String(m).padStart(2, "0") + (h >= 12 ? " PM" : " AM");
}

export function gta6BookingError(values, now = new Date()) {
  const { name, phone, date, time, duration, players } = values;
  if (String(name || "").trim().length < 2) return "Enter your name.";
  const digits = String(phone || "").replace(/\D/g, "");
  if (!(digits.length === 10 || (digits.length === 12 && digits.startsWith("91")))) return "Enter a valid Indian mobile number.";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date || "") || date < earliestGta6Date(now) || date > lastGta6Date(now)) return "Choose a date inside the available launch-period window.";
  if (!gta6Slots(Number(duration), date, now).includes(time)) return "Choose a valid future slot during café hours.";
  if (!Number.isInteger(Number(players)) || Number(players) < 1 || Number(players) > 8) return "Select 1 to 8 players.";
  return "";
}

export function gta6WhatsappMessage({ name, phone, date, time, duration, players, note = "" }) {
  return [
    "🎮 *PIXEL PARADISE – GTA VI LAUNCH-PERIOD SLOT ENQUIRY*",
    "",
    "Player: " + name.trim(),
    "Phone: " + phone.trim(),
    "Preferred date: " + date,
    "Preferred start (IST): " + formatSlotTime(time),
    "Requested play time: " + duration + " minutes",
    "Players: " + players,
    note.trim() ? "Notes: " + note.trim() : "",
    "",
    "This is a request for a gaming café play slot, NOT a preorder or purchase of GTA VI.",
    "Please confirm GTA VI availability at the café, the station, final pricing and my requested slot.",
    "I understand no slot or early access is guaranteed until the café confirms."
  ].filter(Boolean).join("\n");
}
