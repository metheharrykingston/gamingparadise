import test from "node:test";
import assert from "node:assert/strict";
import {
  CAFE_OPEN_MINUTES, CAFE_CLOSE_MINUTES,
  cafeBookingSlots, cafeIndiaNow, isCafeBookingSlot
} from "../src/bookingSlots.js";

const morning = new Date("2026-11-01T03:30:00Z"); // 09:00 IST
const afterClose = new Date("2026-11-01T16:30:00Z"); // 22:00 IST

test("café request slots always run from 10 AM to 10 PM IST with complete session before close", () => {
  assert.equal(CAFE_OPEN_MINUTES, 600);
  assert.equal(CAFE_CLOSE_MINUTES, 1320);
  for (const duration of [30, 60, 120]) {
    const slots = cafeBookingSlots(duration, "2026-11-01", morning);
    assert.equal(slots[0], "10:00");
    assert.equal(slots.at(-1), duration === 30 ? "21:30" : duration === 60 ? "21:00" : "20:00");
    assert.ok(!slots.includes("22:00"));
    assert.ok(!slots.includes("09:30"));
    for (const time of slots) {
      const [hour, minute] = time.split(":").map(Number);
      assert.ok(hour * 60 + minute >= 600);
      assert.ok(hour * 60 + minute + duration <= 1320);
    }
  }
});

test("after café closes, no slots remain today but tomorrow opens at 10 AM", () => {
  assert.deepEqual(cafeIndiaNow(afterClose), {date:"2026-11-01",minutes:1320});
  for (const duration of [30, 60, 120]) {
    assert.deepEqual(cafeBookingSlots(duration,"2026-11-01",afterClose), []);
    assert.equal(cafeBookingSlots(duration,"2026-11-02",afterClose)[0],"10:00");
  }
  const justBefore = new Date("2026-11-01T15:59:00Z"); // 21:29 IST
  assert.deepEqual(cafeBookingSlots(30,"2026-11-01",justBefore), ["21:30"]);
  assert.deepEqual(cafeBookingSlots(60,"2026-11-01",justBefore), []);
  assert.deepEqual(cafeBookingSlots(120,"2026-11-01",justBefore), []);
});

test("invalid dates, elapsed times and late starts are rejected, including WhatsApp handoff", () => {
  assert.deepEqual(cafeBookingSlots(30,"2026-10-31",morning),[]);
  assert.deepEqual(cafeBookingSlots(30,"2026-02-30",morning),[]);
  assert.deepEqual(cafeBookingSlots(30,"",morning),[]);
  assert.deepEqual(cafeBookingSlots(90,"2026-11-02",morning),[]);
  assert.equal(isCafeBookingSlot(30,"2026-11-02","21:30",morning),true);
  assert.equal(isCafeBookingSlot(30,"2026-11-02","22:00",morning),false);
  assert.equal(isCafeBookingSlot(60,"2026-11-02","21:30",morning),false);
  assert.equal(isCafeBookingSlot(120,"2026-11-02","20:30",morning),false);
  assert.equal(isCafeBookingSlot(30,"2026-11-01","21:30",afterClose),false);
  assert.equal(isCafeBookingSlot(30,"2026-11-02","10:00",afterClose),true);
});

test("slots are available every day, not restricted by weekday", () => {
  for (const date of ["2026-11-02","2026-11-03","2026-11-04","2026-11-05","2026-11-06","2026-11-07","2026-11-08"]) {
    assert.equal(cafeBookingSlots(60,date,morning)[0],"10:00");
    assert.equal(cafeBookingSlots(60,date,morning).at(-1),"21:00");
  }
});
