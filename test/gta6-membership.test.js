import test from "node:test";
import assert from "node:assert/strict";
import { plans, sessions, whatsappLink } from "../src/config.js";
import {
  GTA6_RELEASE_DATE, gta6Countdown, earliestGta6Date, lastGta6Date,
  gta6Slots, gta6BookingError, gta6WhatsappMessage
} from "../src/gta6.js";

test("poster memberships reflect three separate monthly offers", () => {
  assert.deepEqual(plans.map(p => [p.id, p.hours, p.bonusHours, p.price, p.actualValue]), [
    ["basic",20,0,"₹1,499","₹2,000"],
    ["pro",40,3,"₹2,799","₹4,000"],
    ["elite",60,0,"₹3,999","₹6,000"]
  ]);
  assert.equal(plans.filter(p => p.featured).length,1);
  assert.ok(plans.find(p=>p.id==="elite").features.some(s=>s.includes("racing")));
  assert.ok(plans.find(p=>p.id==="basic").features.some(s=>s.includes("Advance booking")));
  assert.equal(sessions.length,2, "PS5 and G29 everyday sessions stay separate from GTA VI launch bookings");
});

test("GTA VI countdown measures to announced launch calendar date in IST", () => {
  assert.equal(GTA6_RELEASE_DATE,"2026-11-19");
  assert.deepEqual(gta6Countdown(new Date("2026-11-18T18:29:59Z")), {
    days:0,hours:0,minutes:0,seconds:1,reached:false
  });
  assert.equal(gta6Countdown(new Date("2026-11-18T18:30:00Z")).reached,true);
  assert.equal(gta6Countdown(new Date("2026-11-20T00:00:00Z")).days,0);
});

test("launch slots stay inside 10 AM to 10 PM and don't show elapsed times", () => {
  const beforeLaunch=new Date("2026-11-01T04:00:00Z");
  assert.equal(earliestGta6Date(beforeLaunch),"2026-11-19");
  assert.equal(gta6Slots(60,"2026-11-19",beforeLaunch).at(0),"10:00");
  assert.equal(gta6Slots(60,"2026-11-19",beforeLaunch).at(-1),"21:00");
  assert.equal(gta6Slots(120,"2026-11-19",beforeLaunch).at(-1),"20:00");
  assert.equal(gta6Slots(30,"2026-11-19",beforeLaunch).length,0);
  const launchDay=new Date("2026-11-19T11:15:00Z"); // 16:45 IST
  assert.equal(gta6Slots(60,"2026-11-19",launchDay).at(0),"17:00");
  assert.equal(earliestGta6Date(new Date("2026-11-21T00:00:00Z")),"2026-11-21");
  assert.equal(lastGta6Date(beforeLaunch),"2026-12-18");
});

test("booking validates dates, time, contact and player count", () => {
  const now=new Date("2026-11-01T04:00:00Z");
  const request={name:"Example Player",phone:"9876543210",date:"2026-11-19",time:"10:00",duration:60,players:"2",note:""};
  assert.equal(gta6BookingError(request,now),"");
  assert.match(gta6BookingError({...request,date:"2026-11-18"},now),/date/);
  assert.match(gta6BookingError({...request,time:"09:00"},now),/slot/);
  assert.match(gta6BookingError({...request,phone:"123"},now),/mobile/);
  assert.match(gta6BookingError({...request,players:"20"},now),/players/);
  assert.match(gta6BookingError({...request,duration:120,time:"21:00"},now),/slot/);
});

test("GTA VI WhatsApp handoff is an unpriced slot enquiry, not a game preorder", () => {
  const message=gta6WhatsappMessage({name:"Example Player",phone:"9876543210",date:"2026-11-19",time:"10:00",duration:60,players:2});
  assert.match(message,/NOT a preorder or purchase/);
  assert.match(message,/confirm GTA VI availability/);
  assert.match(message,/10:00 AM/);
  assert.doesNotMatch(message,/₹|guaranteed early access/i);
  assert.equal(new URL(whatsappLink(message)).searchParams.get("text"),message);
});
