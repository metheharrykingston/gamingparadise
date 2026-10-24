import test from "node:test";
import assert from "node:assert/strict";
import { cafe, sessions, whatsappLink } from "../src/config.js";

test("official café number is used for prefilled WhatsApp links", () => {
  assert.equal(cafe.whatsappNumber, "918745998333");
  const message = "🎮 PS5 booking\nSession: 60 minutes\nRate: ₹100";
  const url = new URL(whatsappLink(message));
  assert.equal(url.protocol, "https:");
  assert.equal(url.hostname, "wa.me");
  assert.equal(url.pathname, "/918745998333");
  assert.equal(url.searchParams.get("text"), message);
});

test("gaming price list matches café's quoted rates", () => {
  assert.deepEqual(sessions.map(s => [s.console, s.halfHour, s.hour]), [
    ["PS5", 60, 100],
    ["PS4", 40, 80],
    ["G29 Racing Wheel", 100, 150]
  ]);
});

test("listed session setup IDs are unique", () => {
  assert.equal(new Set(sessions.map(s => s.id)).size, sessions.length);
});
