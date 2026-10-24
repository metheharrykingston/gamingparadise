// Confirm all operating details with café management before going live.
export const cafe = {
  name: "Pixel Paradise Gaming Cafe",
  address: "Shop No. E4/7, 1st Floor, Sai Market, near Mother Dairy, Block E, Sector 56, Noida, Uttar Pradesh",
  hours: "10:00 AM – 10:00 PM",
  instagram: "https://www.instagram.com/pixelparadise.cafe/",
  mapsUrl: "https://maps.app.goo.gl/6YoTHVMyBQz8kLqk7",
  whatsappNumber: "" // Add only after the Noida café verifies ownership.
};
export const plans = [
  {id:"visitor",label:"PLAY IT CASUAL",title:"DROP-IN",description:"A quick game, a spontaneous hangout, no commitment.",price:"PAY PER VISIT",priceNote:"Ask the café for session rates",features:["PS5, PS4 or G29 wheel on availability","Book a casual gaming or racing session","Perfect for first-time visitors"],action:"REQUEST A SESSION",featured:false},
  {id:"regular",label:"FOR THE REGULARS",title:"PIXEL PASS",description:"For players who keep coming back for one more round.",price:"PRICE ON REQUEST",priceNote:"Membership package enquiry",features:["Ask about regular-player packages","Get updates on current member offers","One easy point of contact with the team"],action:"REQUEST PIXEL PASS",featured:true},
  {id:"squad",label:"BETTER TOGETHER",title:"SQUAD PASS",description:"When your favourite game is better with your people.",price:"CUSTOM ENQUIRY",priceNote:"Group sessions and membership",features:["Enquire about group bookings","Ask about recurring squad sessions","Plan a match night with the café"],action:"ENQUIRE AS A SQUAD",featured:false}
];
export function contactLink() { return cafe.instagram; }

export const sessions = [
  { id: "ps5", category: "PLAYSTATION 5", title: "PS5 GAMING", subtitle: "Next-gen console sessions", console: "PS5", halfHour: 60, hour: 100 },
  { id: "ps4", category: "PLAYSTATION 4", title: "PS4 GAMING", subtitle: "Your favourites, your squad", console: "PS4", halfHour: 40, hour: 80 },
  { id: "g29", category: "RACING SIMULATOR", title: "G29 RACING", subtitle: "Get behind the wheel", console: "G29 Racing Wheel", halfHour: 100, hour: 150 }
];
