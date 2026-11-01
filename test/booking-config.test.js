import test from "node:test";
import assert from "node:assert/strict";
import { allowedPlayerCounts, gamesForParty, playerCountsForParty, cafe, gameForSession, hourlySaving, sessions, whatsappLink } from "../src/config.js";

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
    ["G29 Racing Wheel", 100, 150]
  ]);
});

test("listed session setup IDs are unique", () => {
  assert.equal(new Set(sessions.map(s => s.id)).size, sessions.length);
});


test("only PS5 and G29 racing are offered; PS4 is removed", () => {
  assert.deepEqual(sessions.map(s => s.id), ["ps5", "g29"]);
  assert.equal(sessions.some(s => /ps4/i.test(s.title)), false);
});

test("advertised PS5 and G29 game lists are present and have unique IDs", () => {
  const [ps5, g29] = sessions;
  assert.deepEqual(ps5.games.map(g=>g.name), [
    "GTA 5", "Tekken 8", "Mortal Kombat", "Spider-Man", "WWE 2K26",
    "FC 26", "Street Fighter", "It Takes Two", "Resident Evil Village",
    "Watch Dogs", "Final Fantasy XVI", "Unravel Two", "Wo Long", "Call of Duty"
  ]);
  assert.deepEqual(g29.games.map(g=>g.name), ["Forza Horizon 5", "The Crew Motorfest", "F1 26"]);
  for (const session of sessions) {
    assert.equal(new Set(session.games.map(g=>g.id)).size, session.games.length);
    assert.ok(session.games.every(g => allowedPlayerCounts(session,g).length > 0));
  }
});

test("G29 is always single-driver; selected PS5 multiplayer game controls party-size options", () => {
  const ps5 = sessions.find(s => s.id === "ps5");
  const g29 = sessions.find(s => s.id === "g29");
  assert.equal(g29.maxPlayers,1);
  for (const game of g29.games) assert.deepEqual(allowedPlayerCounts(g29, game), [1]);
  assert.deepEqual(allowedPlayerCounts(ps5,gameForSession(ps5,"tekken8")),[1,2]);
  assert.deepEqual(allowedPlayerCounts(ps5,gameForSession(ps5,"fc26")),[1,2,3,4]);
  assert.deepEqual(allowedPlayerCounts(ps5,gameForSession(ps5,"ittakestwo")),[2]);
  assert.deepEqual(allowedPlayerCounts(ps5,gameForSession(ps5,"gta5")),[1]);
  assert.deepEqual(allowedPlayerCounts(ps5,gameForSession(ps5,"unraveltwo")),[1,2]);
  assert.equal(gameForSession(g29,"not-a-game").id,"forza5");
});

test("G29 one-hour price saves ₹50 compared with two half-hour sessions", () => {
  const g29=sessions.find(s=>s.id==="g29");
  assert.equal(g29.halfHour,100);
  assert.equal(g29.hour,150);
  assert.equal(g29.halfHour*2,200);
  assert.equal(hourlySaving(g29),50);
  assert.equal(hourlySaving(sessions.find(s=>s.id==="ps5")),20);
});

test("booking game filter separates solo and same-screen multiplayer correctly", () => {
  const ps5 = sessions.find(s => s.id === "ps5");
  const wheel = sessions.find(s => s.id === "g29");
  const solo = gamesForParty(ps5, "solo").map(g => g.id);
  const squad = gamesForParty(ps5, "friends").map(g => g.id);
  assert.ok(solo.includes("gta5"));
  assert.ok(solo.includes("tekken8")); // fighting games can be played solo too
  assert.ok(!solo.includes("ittakestwo")); // co-op needs two players
  assert.ok(squad.includes("tekken8"));
  assert.ok(squad.includes("fc26"));
  assert.ok(squad.includes("ittakestwo"));
  assert.ok(!squad.includes("gta5")); // GTA 5 is not local split-screen
  assert.deepEqual(gamesForParty(wheel, "friends"), []);
  assert.equal(gamesForParty(wheel, "solo").length, 3);
  assert.deepEqual(playerCountsForParty(ps5, gameForSession(ps5, "fc26"), "friends"), [2,3,4]);
  assert.deepEqual(playerCountsForParty(ps5, gameForSession(ps5, "tekken8"), "solo"), [1]);
  assert.deepEqual(playerCountsForParty(ps5, gameForSession(ps5, "tekken8"), "friends"), [2]);
  assert.deepEqual(playerCountsForParty(ps5, gameForSession(ps5, "ittakestwo"), "friends"), [2]);
  assert.deepEqual(playerCountsForParty(wheel, wheel.games[0], "solo"), [1]);
  assert.deepEqual(playerCountsForParty(wheel, null, "solo"), []);
});
