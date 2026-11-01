// Confirm all operating details with café management before going live.
export const cafe = {
  name: "Pixel Paradise Gaming Cafe",
  address: "Shop No. E4/7, 1st Floor, Sai Market, near Mother Dairy, Block E, Sector 56, Noida, Uttar Pradesh",
  hours: "10:00 AM – 10:00 PM",
  instagram: "https://www.instagram.com/pixelparadise.cafe/",
  mapsUrl: "https://maps.app.goo.gl/6YoTHVMyBQz8kLqk7",
  whatsappNumber: "918745998333" // Verified for booking enquiries by café owner.
};
export const plans = [
  {
    id:"basic",label:"THE EVERYDAY PLAYER",title:"BASIC PASS",
    description:"Easy entry into a month of more play.",
    price:"₹1,499",actualValue:"₹2,000",hours:20,bonusHours:0,priceNote:"per month",
    features:["20 hours of gaming time","Advance booking not included (confirm with café)","Setup and hours subject to café terms"],
    action:"REQUEST BASIC PASS",featured:false
  },
  {
    id:"pro",label:"MOST POPULAR",title:"PRO PASS",
    description:"More hours. More matches. More reasons to come back.",
    price:"₹2,799",actualValue:"₹4,000",hours:40,bonusHours:3,priceNote:"per month",
    features:["40 hours + 3 bonus hours","43 total promotional play hours","Bonus-hour and setup terms confirmed by café"],
    action:"REQUEST PRO PASS",featured:true
  },
  {
    id:"elite",label:"PREMIUM PLAYER",title:"ELITE PASS",
    description:"The top-tier monthly play package.",
    price:"₹3,999",actualValue:"₹6,000",hours:60,bonusHours:0,priceNote:"per month",
    features:["60 hours of gaming time","Premium setups: racing and big screen","Premium equipment is subject to availability"],
    action:"REQUEST ELITE PASS",featured:false
  }
];
// These are the monthly-pass offers transcribed from the café poster.
// GTA VI-specific sessions, purchases and launch-day pricing are NOT included in these prices.

export function whatsappLink(message) {
  return "https://wa.me/" + cafe.whatsappNumber + "?text=" + encodeURIComponent(message);
}
export function contactLink() { return "https://wa.me/" + cafe.whatsappNumber; }

// Display titles supplied by the café; availability and local player/controller capacity
// are always subject to confirmation at the counter.
export const sessions = [
  {
    id: "ps5", category: "PLAYSTATION 5", title: "PS5 GAMING",
    subtitle: "Solo adventures & local multiplayer battles",
    console: "PS5", halfHour: 60, hour: 100, maxPlayers: 4,
    games: [
      { id: "gta5", name: "GTA 5", minPlayers: 1, maxPlayers: 1, mode: "Solo" },
      { id: "tekken8", name: "Tekken 8", minPlayers: 1, maxPlayers: 2, mode: "Versus" },
      { id: "mortalkombat", name: "Mortal Kombat", minPlayers: 1, maxPlayers: 2, mode: "Versus" },
      { id: "spiderman", name: "Spider-Man", minPlayers: 1, maxPlayers: 1, mode: "Solo" },
      { id: "wwe2k26", name: "WWE 2K26", minPlayers: 1, maxPlayers: 4, mode: "Multiplayer" },
      { id: "fc26", name: "FC 26", minPlayers: 1, maxPlayers: 4, mode: "Multiplayer" },
      { id: "streetfighter", name: "Street Fighter", minPlayers: 1, maxPlayers: 2, mode: "Versus" },
      { id: "ittakestwo", name: "It Takes Two", minPlayers: 2, maxPlayers: 2, mode: "Co-op" },
      { id: "village", name: "Resident Evil Village", minPlayers: 1, maxPlayers: 1, mode: "Solo" },
      { id: "watchdogs", name: "Watch Dogs", minPlayers: 1, maxPlayers: 1, mode: "Solo" },
      { id: "ffxvi", name: "Final Fantasy XVI", minPlayers: 1, maxPlayers: 1, mode: "Solo" },
      { id: "unraveltwo", name: "Unravel Two", minPlayers: 1, maxPlayers: 2, mode: "Co-op" },
      { id: "wolong", name: "Wo Long", minPlayers: 1, maxPlayers: 1, mode: "Solo" },
      { id: "cod", name: "Call of Duty", minPlayers: 1, maxPlayers: 1, mode: "Ask about edition" }
    ]
  },
  {
    id: "g29", category: "CAR RACING", title: "G29 RACING",
    subtitle: "Logitech G29 wheel + six-gear shifter • single-player setup",
    console: "G29 Racing Wheel", halfHour: 100, hour: 150, maxPlayers: 1,
    games: [
      { id: "forza5", name: "Forza Horizon 5", minPlayers: 1, maxPlayers: 1, mode: "Solo" },
      { id: "motorfest", name: "The Crew Motorfest", minPlayers: 1, maxPlayers: 1, mode: "Solo" },
      { id: "f126", name: "F1 26", minPlayers: 1, maxPlayers: 1, mode: "Solo" }
    ]
  }
];

// The ₹50 G29 one-hour saving is versus buying two ₹100 half-hour sessions.
export function hourlySaving(session) {
  return Math.max(0, session.halfHour * 2 - session.hour);
}

export function gameForSession(session, id) {
  return session.games.find(game => game.id === id) || session.games[0];
}

export function allowedPlayerCounts(session, game) {
  const minimum = Math.max(1, game.minPlayers || 1);
  const maximum = Math.min(session.maxPlayers, game.maxPlayers);
  return Array.from({length: Math.max(0, maximum - minimum + 1)}, (_, index) => minimum + index);
}

/** Restrict title choices to the requested LOCAL play style, not online player counts. */
export function gamesForParty(session, partyType) {
  if (session.id === "g29") return partyType === "solo" ? session.games : [];
  if (partyType === "friends") return session.games.filter(game => game.maxPlayers >= 2);
  if (partyType === "solo") return session.games.filter(game => game.minPlayers <= 1);
  return [];
}

export function playerCountsForParty(session, game, partyType) {
  if (!game) return [];
  const supported = allowedPlayerCounts(session, game);
  return supported.filter(n => partyType === "friends" ? n >= 2 : n === 1);
}
